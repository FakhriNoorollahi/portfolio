import { useContext } from "react";
import { DesignerProductsContext } from "./DesignerProductsContext";

export function useDesignerProducts() {
  const context = useContext(DesignerProductsContext);

  if (context === null) {
    throw new Error(
      "useDesignerProducts must be used inside DesignerProductsProvider",
    );
  }

  return context;
}
