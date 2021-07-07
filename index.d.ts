import Router from "./src/router";

export interface Req {
    method: string;
    params?: Record<string, any>;
    query?: Record<string, string>;
    path?: string;
    routePath?: string;
    url: string;
}

export interface Res {
    redirect(path: string, query?: any, replace?: boolean): void;
    send(body: any): void;
}

export type Promisable<T> = Promise<T> | T;
export type NextHandler = (err?: string | Error) => Promisable<void>;
export type ErrorHandler<T extends Req> = (err: string | Error | null, req: T, res: Res) => Promisable<void>;
export type Middleware<T extends Req> = (req: T & Req, res: Res, next: NextHandler) => Promisable<void>;
export type NoMatchMiddleware<T extends Req> = (req: T & Req, res: Res) => Promisable<void>;
export type MatchMiddleware<T extends Req> = (req: T & Req, body: string | any) => Promisable<void>;
export type Pattern = RegExp | string;

declare class Browter<T extends Req = Req> extends Router<T> {
    constructor();
    listen({ onError, onMatch, onNoMatch }?: { onError?: ErrorHandler<T>, onMatch?: MatchMiddleware<T>, onNoMatch?: NoMatchMiddleware<T> }): void;
    unlisten(): void;
    redirect(path: string, query?: any, replace?: boolean): void;
}