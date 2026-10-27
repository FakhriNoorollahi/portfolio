import express from "express";
import { initializeDatabase } from "./database.js";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import React from "react";
import { getSSRMenuItems } from "./utils/getSSRMenuItems.js";
import { renderSSRPage } from "./utils/renderSSRPage.js";

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

        if (!page) {
          return res.status(404).send("صفحه منتشرشده پیدا نشد.");
        }

        const productsResponse = await fetch(
          "https://dummyjson.com/products?limit=0",
        );

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products from DummyJSON");
        }

        const productsData = await productsResponse.json();
        const initialProducts = productsData.products;

        const { StaticRouter } = await vite.ssrLoadModule("react-router");

        const { default: ProductsSSRProvider } = await vite.ssrLoadModule(
          "/src/context/ProductsSSR/ProductsSSRProvider.jsx",
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

        const { DesignerProductsProvider } = await vite.ssrLoadModule(
          "/src/context/DesignerProducts/DesignerProductsProvider.jsx",
        );

        const elements = JSON.parse(page.elements);

        const allMenuItems = await getSSRMenuItems(db);

        const initialData = {
          pageType: "published-page",
          elements,
          allMenuItems,
          initialProducts,
        };

        const html = React.createElement(
          StaticRouter,
          { location: req.originalUrl },
          React.createElement(
            ThemeProvider,
            { theme },
            React.createElement(
              ProductsSSRProvider,
              { initialProducts },
              React.createElement(
                DesignerProductsProvider,
                null,
                React.createElement(ProductsLayout, {
                  ssrMenuItems: allMenuItems,
                  children: React.createElement(NewComponentsMain, {
                    elements,
                  }),
                }),
              ),
            ),
          ),
        );

        renderSSRPage({
          req,
          res,
          html,
          title: page.title,
          initialData,
          escapeHtml,
        });
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

    app.get("/products/:id", async (req, res, next) => {
      try {
        const productResponse = await fetch(
          `https://dummyjson.com/products/${req.params.id}`,
        );

        if (!productResponse.ok) {
          throw new Error("Failed to fetch products from DummyJSON");
        }

        const productDataInfo = await productResponse.json();

        const productData = {
          title: productDataInfo.title,
          description: productDataInfo.description,
          category: productDataInfo.category,
          price: productDataInfo.price,
          rating: productDataInfo.rating,
          brand: productDataInfo.brand,
        };

        const { StaticRouter } = await vite.ssrLoadModule("react-router");

        const { default: theme } = await vite.ssrLoadModule(
          "/src/theme/index.js",
        );

        const { ThemeProvider } = await vite.ssrLoadModule(
          "@mui/material/styles",
        );

        const { default: ProductsLayout } = await vite.ssrLoadModule(
          "/src/layouts/ProductsLayout.jsx",
        );

        const { default: ProductDetailSSR } = await vite.ssrLoadModule(
          "/src/features/newComponents/components/ProductDetailSSR.jsx",
        );

        const allMenuItems = await getSSRMenuItems(db);

        const initialData = {
          pageType: "product-detail",
          product: productData,
          allMenuItems,
        };

        const html = React.createElement(
          StaticRouter,
          { location: req.originalUrl },
          React.createElement(
            ThemeProvider,
            { theme },
            React.createElement(ProductsLayout, {
              ssrMenuItems: allMenuItems,
              children: React.createElement(ProductDetailSSR, {
                initialData,
              }),
            }),
          ),
        );

        renderSSRPage({
          req,
          res,
          html,
          title: productData.title,
          initialData,
          escapeHtml,
        });
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
