import { Database } from 'bun:sqlite';
import { getAllSkylanders } from './components/item';
import Skylander from './models/skylander';

const db = new Database("mydb.sqlite", {strict: true});

const server = Bun.serve({
    async fetch (req) {
        const path = new URL(req.url).pathname;

        if (path == "/clicked") {
            const query = db.query("SELECT * FROM skylanders;").as(Skylander);
            const resp = query.all();
            if (resp != null) {
                const stream = await getAllSkylanders(resp)
                return new Response(stream, {
                    headers: {"Content-Type": "text/html"}
                })
            }
        }

        // Support files
        if (path == "/htmx.min.js") {
            return new Response(Bun.file("htmx.min.js"), {
                headers: {"Content-Type": "text/javascript"}
            });
        }
        if (path == "/index.css") {
            return new Response(Bun.file("index.css"), {
                headers: {"Content-Type": "text/css"}
            });
        }

        // HTML File response
        return new Response(Bun.file("index.html"));
    }
})

console.log(`Listening on ${server.url}`);