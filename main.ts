import { Webview } from "@webview/webview";

const html = await Deno.readTextFileSync("index.html");

const webview = new Webview();

webview.navigate(`data:text/html,${encodeURIComponent(html.toString())}`);

webview.bind("press", (text: string) => {
  console.log(text);

  return "Pong!"
})

webview.bind("log", (...args) => console.log(...args))


webview.run();