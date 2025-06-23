import { Webview } from "webview-bun";

const webview = new Webview();
webview.navigate("http://localhost:3000");

webview.bind("sendProc", (...args) => {
    //@ts-expect-error
    process.send(...args);
})
webview.run();