const webview = new Worker("webview.ts");

webview.addEventListener("close", () => {
    server.terminate();
})
const server = new Worker("server.ts");