import { Webview } from "webview-bun";

const server = new Worker("server.ts");

const webview = new Webview();
webview.title = "LanderTracker";
webview.navigate("http://localhost:8080");
webview.run();

server.terminate();
