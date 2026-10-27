import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

export function renderSSRPage({
  req,
  res,
  html,
  title,
  initialData,
  escapeHtml,
}) {
  console.log(req);
  const serializedInitialData = JSON.stringify(initialData).replace(
    /</g,
    "\\u003c",
  );

  const body = new PassThrough();

  body.on("error", (error) => {
    console.error("SSR response stream error:", error);
    res.destroy(error);
  });

  body.on("end", () => {
    if (!res.writableEnded) {
      res.end(`
        </div>
        <script id="initial-data" type="application/json">${serializedInitialData}</script>
        <script type="module">
          import RefreshRuntime from "/@react-refresh";
          RefreshRuntime.injectIntoGlobalHook(window);
          window.$RefreshReg$ = () => {};
          window.$RefreshSig$ = () => (type) => type;
          window.__vite_plugin_react_preamble_installed__ = true;
        </script>
        <script type="module" src="/src/entry-client.jsx"></script>
        </body>
        </html>
      `);
    }
  });

  const stream = renderToPipeableStream(html, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");

      res.write(`<!doctype html>
        <html lang="fa" dir="rtl">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${escapeHtml(title)}</title>
          </head>
          <body>
            <div id="root">`);

      body.pipe(res, { end: false });
      stream.pipe(body);
    },

    onShellError(error) {
      console.error("SSR shell error:", error);

      if (!res.headersSent) {
        res.status(500).send("خطا در رندر صفحه.");
      } else {
        res.destroy(error);
      }
    },

    onError(error) {
      console.error("SSR render error:", error);
    },
  });
}
