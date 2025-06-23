import { Webview } from "webview-bun";
import { Database } from 'bun:sqlite'


const webview = new Webview();
webview.navigate("http://localhost:3000");

webview.run();