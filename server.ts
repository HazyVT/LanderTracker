import { Database } from 'bun:sqlite';
import { getAllSkylanders, getSkylanderItem } from './components/item';
import Skylander from './models/skylander';

const db = new Database("mydb.sqlite", {strict: true});

const server = Bun.serve({
    async fetch (req) {
        const path = new URL(req.url).pathname;

        if (path == "/clicked") {
            const skylander = new Skylander();
            skylander.id = 1;
            skylander.name = "name";
            skylander.image = "image";
            return new Response(await getSkylanderItem(skylander), {
                headers: {"Content-Type": "text/html"}
            })
        }

        // Support files
        if (path == "/htmx.min.js") {
            return new Response(Bun.file("support/htmx.min.js"), {
                headers: {"Content-Type": "text/javascript"}
            });
        }
        if (path == "/index.css") {
            return new Response(Bun.file("support/index.css"), {
                headers: {"Content-Type": "text/css"}
            });
        }

        // HTML File response
        return new Response(Bun.file("support/index.html"));
    }
})

console.log(`Listening on ${server.url}`);