import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "pages.db");

export async function initializeDatabase() {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE,
      title TEXT NOT NULL,
      elements TEXT NOT NULL,
      link TEXT NOT NULL,
      isActive INTEGER NOT NULL DEFAULT 0
        CHECK (isActive IN (0, 1)),
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const columns = await db.all("PRAGMA table_info(pages)");

  if (!columns.some((column) => column.name === "title")) {
    await db.exec(
      "ALTER TABLE pages ADD COLUMN title TEXT NOT NULL DEFAULT ''",
    );
  }

  if (!columns.some((column) => column.name === "link")) {
    await db.exec("ALTER TABLE pages ADD COLUMN link TEXT NOT NULL DEFAULT ''");
  }

  if (!columns.some((column) => column.name === "isActive")) {
    await db.exec(
      "ALTER TABLE pages ADD COLUMN isActive TEXT NOT NULL DEFAULT ''",
    );
  }

  console.log("SQLite database initialized.");

  return db;
}
