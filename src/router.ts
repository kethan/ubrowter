import { Req, Middleware, Res, ErrorHandler, MatchMiddleware, NoMatchMiddleware } from "../index";
import { decode, pathToRegex } from "./utils";

export default class Router<T extends Req = Req> {
    protected routes: { path: string, method: string, handlers: Middleware<T>[] }[] = [];
    protected handlers: Middleware<T>[] = [];
    constructor() { }

    use(...handlers: Middleware<T>[]): this {
        this.handlers = [...this.handlers, ...handlers,];
        return this;
    }

    get(path: string, ...handlers: Middleware<T>[]): this {
        this.routes.push({ path: path, method: "GET", handlers: handlers });
        return this;
    }

    protected handler({ req, res, onError, onMatch, onNoMatch }: { req: T, res: Res, onError: ErrorHandler<T>, onMatch: MatchMiddleware<T>, onNoMatch: NoMatchMiddleware<T> }) {
        let found = false;
        for (const { path, handlers } of (this.routes).filter(r => r.method.toLowerCase() == req.method.toLowerCase())) {
            let x = pathToRegex(path, req.url);
            if (x.match) {
                found = true;
                let fns = [...this.handlers, ...handlers];
                req.params = x.params;
                req.path = x.url;
                req.routePath = path;
                req.query = decode(x.url.split("?")[1] || "");
                let run = (rReq: T, rRes: Res) => {
                    try {
                        let middleware = fns.shift();
                        middleware
                            ? middleware(rReq, rRes, (err: any) => err ? onError(err, rReq, rRes) : run(rReq, rRes))
                            : onError(null, rReq, rRes);
                    } catch (error) {
                        onError(error, rReq, rRes);
                    }
                };
                run(req, res);
            }
        }
        if (!found) {
            onNoMatch(req, res);
        }
    }
}