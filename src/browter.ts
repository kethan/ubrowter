import { Req, ErrorHandler, NoMatchMiddleware } from "../index";
import Router from "./router";
import { encode } from "./utils";

export default class Browter<T extends Req = Req> extends Router<T> {

    private listener = {
        onError: () => { }, onNoMatch: () => { }
    } as { onError: ErrorHandler<T>, onNoMatch: NoMatchMiddleware<T> }

    constructor() {
        super();
    }

    private click = (e: any) => {
        var x = e.target.closest('a'), y = x && x.getAttribute('href');
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button || e.defaultPrevented) return;
        if (!y || x.target || x.host !== location.host || y[0] == '#') return;
        e.preventDefault();
        if (y != location.pathname + location.search)
            this.redirect(y);
    }

    redirect(path: string, query = {}, replace: boolean = false): void {
        let req = { url: path, method: 'GET', body: null } as T;
        path = path + (Object.keys(query).length !== 0 ? encode(query, '?') : '');
        if (path == location.pathname + location.search) history.replaceState(path, "", path)
        else replace ? history.replaceState(path, "", path) : history.pushState(path, "", path);
        let send = (body: any) => req.body = body;
        this.handler({
            req: req, res: { redirect: this.redirect.bind(this), send: send.bind(this) }, onError: (err, req, res) => {
                this.listener.onError(err, req, res);
            }, onNoMatch: (req, res) => {
                this.listener.onNoMatch(req, res);
            }
        });
    }

    private route() {
        this.redirect(location.pathname + location.search);
    }

    unlisten(): void {
        removeEventListener("popstate", this.route.bind(this));
        removeEventListener("click", this.click);
    }

    listen(listener = this.listener): void {
        this.listener = listener;
        addEventListener("popstate", this.route.bind(this));
        addEventListener("click", this.click);
        this.route();
    }
}