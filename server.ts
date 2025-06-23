const server = Bun.serve({
    async fetch (req) {
        const path = new URL(req.url).pathname;

        if (path == "/clicked") {
            return new Response("<div>You cliked Me!</div>")
        }
        if (path == "/htmx.min.js") {
            return new Response(Bun.file("htmx.min.js"), {
                headers: {"Content-Type": "text/javascript"}
            });
        }
        return new Response(Bun.file("index.html"));
    }
})

console.log(`Listening on ${server.url}`);