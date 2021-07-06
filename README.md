# Browter

```html
<ul>
	<li><a href="/">home</a></li>
	<li><a href="/posts?limit=10">posts</a></li>
	<li><a href="/posts/2">post Id</a></li>
	<li><a href="/error">error</a></li>
	<li><a href="/redirect">redirect to home</a></li>
	<li><a href="/nomatch">not found</a></li>
</ul>
```

```ts
import { Browter } from "../src";
import { Req } from "../";

interface CustomRequest extends Req {
	date: Date;
}

let a = new Browter<CustomRequest>();

let result = {
	onMatch: (req, body) => console.log(body, req),
	onError: (error, req, res) => console.log(error),
	onNoMatch: (req, res) => console.log("404", req),
};

a.use((req, res, next) => {
	req.date = new Date();
	next();
})
	.get("/", (req, res) => res.send("home"))
	.get("/posts", (req, res) => res.send("posts"))
	.get("/posts/:id", (req, res) => res.send(`posts ${req.params}`))
	.get("/error", (req, res) => {
		throw "error";
	})
	.get("/redirect", (req, res) => res.redirect("/", {}, true))
	.listen(result);

setTimeout(() => {
	// a.redirect("/about", {q: 99});
	// a.unlisten();
}, 3000);
```
