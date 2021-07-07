import { Browter } from "../src";
import { Req } from "..";

interface CustomRequest extends Req {
    date: Date;
}

let a = new Browter<CustomRequest>();

let result = {
    onError: (error, req, res) => console.log('error', error, req, res),
    onNoMatch: (req, res) => console.log("404", req)
};

a
    .use((req, res, next) => {
        req.date = new Date();
        next();
    })
    .get("/", (req, res, next) => console.log("home"))
    .get("/posts", (req, res) => console.log("posts"))
    .get("/posts/:id", (req, res) => console.log(`posts ${req.params?.id}`))
    .get("/error", (req, res) => { throw "error" })
    .get("/redirect", (req, res) => res.redirect("/", {}, true))
    .listen(result);

setTimeout(() => {
    // a.redirect("/posts", {q: 99}, false);
    // a.unlisten();
}, 3000);

