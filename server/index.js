import express from "express";
import { initializeDatabase } from "./database.js";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { renderToPipeableStream } from "react-dom/server";
import React from "react";
import { PassThrough } from "node:stream";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    const db = await initializeDatabase();

    const vite = await createViteServer({
      configFile: "vite.config.js",
      server: {
        middlewareMode: true,
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.post("/api/pages", async (req, res) => {
      try {
        const {
          id,
          title,
          elements = [],
          link,
          isActive,
          status = "draft",
        } = req.body;

        if (!id || !title.trim()) {
          return res.status(400).json({
            error: "شناسه و عنوان صفحه الزامی هستند.",
          });
        }

        const slug = String(title).trim().toLowerCase().replace(/\s+/g, "-");

        await db.run(
          `INSERT INTO pages (id, slug, title, elements, link, isActive, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
          String(id),
          `${slug}-${id}`,
          title.trim(),
          JSON.stringify(elements),
          link,
          isActive,
          status,
        );

        return res.status(201).json({
          id: String(id),
          slug: `${slug}-${id}`,
          title: title.trim(),
          elements,
          link,
          isActive,
          status,
        });
      } catch (error) {
        console.error("Failed to create page:", error);

        if (error.code === "SQLITE_CONSTRAINT") {
          return res.status(409).json({
            error: "شناسه یا آدرس این صفحه قبلاً ثبت شده است.",
          });
        }

        return res.status(500).json({
          error: "خطا در ایجاد صفحه.",
        });
      }
    });

    app.get("/api/pages/:id", async (req, res) => {
      try {
        const page = await db.get(
          `SELECT id, slug, title, elements, link, isActive, status, created_at, updated_at
       FROM pages
       WHERE id = ?`,
          String(req.params.id),
        );

        if (!page) {
          return res.status(404).json({
            error: "صفحه پیدا نشد.",
          });
        }

        return res.json({
          ...page,
          elements: JSON.parse(page.elements),
        });
      } catch (error) {
        console.error("Failed to read page:", error);

        return res.status(500).json({
          error: "خطا در خواندن صفحه.",
        });
      }
    });

    app.put("/api/pages/:id", async (req, res) => {
      try {
        const { title, elements, status, isActive, link } = req.body;

        const existingPage = await db.get(
          "SELECT id FROM pages WHERE id = ?",
          String(req.params.id),
        );

        if (!existingPage) {
          return res.status(404).json({
            error: "صفحه پیدا نشد.",
          });
        }

        await db.run(
          `UPDATE pages
       SET title = COALESCE(?, title),
           elements = COALESCE(?, elements),
           status = COALESCE(?, status),
            link = COALESCE(?, link),
           isActive = COALESCE(?, isActive),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
          title ?? null,
          elements === undefined ? null : JSON.stringify(elements),
          status ?? null,
          link ?? null,
          isActive ?? null,
          String(req.params.id),
        );

        return res.json({
          message: "صفحه با موفقیت به‌روزرسانی شد.",
          id: String(req.params.id),
        });
      } catch (error) {
        console.error("Failed to update page:", error);

        return res.status(500).json({
          error: "خطا در به‌روزرسانی صفحه.",
        });
      }
    });

    app.get("/api/public-pages/:slug", async (req, res) => {
      try {
        const page = await db.get(
          `SELECT id, slug, title, elements, link, isActive, status
           FROM pages
           WHERE slug = ? AND status = 'published'`,
          req.params.slug,
        );

        if (!page) {
          return res.status(404).json({
            error: "صفحه منتشرشده پیدا نشد.",
          });
        }

        return res.json({
          ...page,
          elements: JSON.parse(page.elements),
        });
      } catch (error) {
        console.error("Failed to read public page:", error);

        return res.status(500).json({
          error: "خطا در دریافت صفحه.",
        });
      }
    });

    app.get("/pages/:slug", async (req, res, next) => {
      try {
        const page = await db.get(
          `SELECT id, slug, title, elements, link, isActive
   FROM pages
   WHERE slug = ? AND status = 'published'`,
          req.params.slug,
        );

        console.log("page", page);

        if (!page) {
          return res.status(404).send("صفحه منتشرشده پیدا نشد.");
        }

        const menuRows = await db.all(`
  SELECT id, type, title, link, isActive, sort_order
  FROM menu_items
  WHERE isActive = 1
  ORDER BY sort_order ASC
`);
        const menuItems = menuRows.map((item) => {
          const link = item.link?.trim() || "/";

          const href = /^https?:\/\//i.test(link)
            ? link
            : `/${link.replace(/^\/+/, "")}`;

          return {
            ...item,
            href,
          };
        });

        const publicPages = await db.all(`
  SELECT id, slug, title, link, isActive
  FROM pages
  WHERE status = 'published' AND isActive = 1
  ORDER BY created_at DESC
`);

        const pageMenuItems = publicPages.map((item) => ({
          id: item.id,
          type: "WEB_PAGES",
          title: item.title,
          href: `/pages/${item.slug}`,
          sort_order: 1000,
        }));

        const allMenuItems = [...menuItems, ...pageMenuItems].sort(
          (a, b) => a.sort_order - b.sort_order,
        );

        const { default: theme } = await vite.ssrLoadModule(
          "/src/theme/index.js",
        );

        const { ThemeProvider } = await vite.ssrLoadModule(
          "@mui/material/styles",
        );

        const { default: ProductsLayout } = await vite.ssrLoadModule(
          "/src/layouts/ProductsLayout.jsx",
        );

        const { default: NewComponentsMain } = await vite.ssrLoadModule(
          "/src/features/NewComponents/components/NewComponentsMain.jsx",
        );

        const elements = JSON.parse(page.elements);
        console.log("SSR page:", page.title, page.slug);
        console.log("SSR elements:", JSON.stringify(elements, null, 2));

        const body = new PassThrough();

        body.on("error", (error) => {
          console.error("SSR response stream error:", error);
          res.destroy(error);
        });

        body.on("end", () => {
          if (!res.writableEnded) {
            res.end("</div></body></html>");
          }
        });

        let stream;

        stream = renderToPipeableStream(
          React.createElement(
            ThemeProvider,
            { theme },
            React.createElement(ProductsLayout, {
              ssrMenuItems: allMenuItems,
              children: React.createElement(NewComponentsMain, {
                elements,
              }),
            }),
          ),
          {
            onShellReady() {
              res.statusCode = 200;
              res.setHeader("Content-Type", "text/html; charset=utf-8");

              res.write(`<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.title)}</title>
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
          },
        );
      } catch (error) {
        next(error);
      }
    });

    app.get("/api/public-pages", async (req, res) => {
      try {
        const pages = await db.all(
          `SELECT id, slug, title, link, isActive
       FROM pages
       WHERE status = 'published'
       ORDER BY created_at DESC`,
        );

        return res.json(pages);
      } catch (error) {
        console.error("Failed to list public pages:", error);

        return res.status(500).json({
          error: "خطا در دریافت صفحات منتشرشده.",
        });
      }
    });

    app.get("/api/menu-items", async (req, res, next) => {
      try {
        const items = await db.all(`
      SELECT id, type, title, link, isActive, sort_order
      FROM menu_items
      ORDER BY sort_order ASC
    `);

        res.json(items);
      } catch (error) {
        next(error);
      }
    });

    app.put("/api/menu-items", async (req, res, next) => {
      try {
        const { items } = req.body;

        if (!Array.isArray(items)) {
          return res.status(400).json({
            message: "items باید آرایه باشد.",
          });
        }

        await db.exec("BEGIN");

        try {
          for (let index = 0; index < items.length; index++) {
            const item = items[index];

            if (
              item.id == null ||
              !item.type ||
              typeof item.title !== "string"
            ) {
              throw new Error("اطلاعات یکی از آیتم‌های منو معتبر نیست.");
            }

            await db.run(
              `INSERT INTO menu_items
            (id, type, title, link, isActive, sort_order)
           VALUES (?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
            type = excluded.type,
            title = excluded.title,
            link = excluded.link,
            isActive = excluded.isActive,
            sort_order = excluded.sort_order`,
              String(item.id),
              item.type,
              item.title,
              item.link ?? "",
              item.isActive ? 1 : 0,
              item.sort_order ?? index,
            );
          }

          await db.exec("COMMIT");
        } catch (error) {
          await db.exec("ROLLBACK");
          throw error;
        }

        res.json({ message: "آیتم‌های منو ذخیره شدند." });
      } catch (error) {
        next(error);
      }
    });

    function escapeHtml(value = "") {
      return String(value).replace(
        /[&<>"']/g,
        (char) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[char],
      );
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // process.exitCode = 1;
  }
}

startServer();
