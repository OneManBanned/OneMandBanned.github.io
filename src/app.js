import express from "express";
import ejs from "ejs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { indexRoute } from "./routes/indexRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 8000 || process.env.PORT;

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
    const { default: connectLivereload } = await import("connect-livereload");
    const { createServer } = await import("livereload");

    app.use(connectLivereload());

    const liveReloadServer = createServer();

    liveReloadServer.watch(path.join(__dirname, "../public"));

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

}

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "../views"));
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.use("/", indexRoute);
app.use((req, res, next) => {
    res.render('404.html', {title: '404 - Not Found', env: process.env.NODE_ENV })
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
