const webview = Bun.spawn(["bun","webview.ts"] ,{
    ipc(message, subprocess, handle) {
        console.log(message);
    },
    onExit() {
        server.kill();
    }
});
const server = Bun.spawn(["bun","server.ts"]);