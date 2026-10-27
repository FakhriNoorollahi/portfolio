import { hydrateRoot } from "react-dom/client";
import { PublishedPageApp } from "./ssr/PublishedPageApp";

const rootElement = document.getElementById("root");
const dataElement = document.getElementById("initial-data");

if (!rootElement || !dataElement) {
  throw new Error("SSR root or initial data was not found.");
}

const initialData = JSON.parse(dataElement.textContent);

console.log("Hydration started", window.location.pathname);
hydrateRoot(rootElement, <PublishedPageApp initialData={initialData} />);
