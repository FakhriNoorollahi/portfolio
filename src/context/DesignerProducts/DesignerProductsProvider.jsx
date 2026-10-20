import { useState } from "react";
import { DesignerProductsContext } from "./DesignerProductsContext";

export function DesignerProductsProvider({ children }) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <DesignerProductsContext.Provider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </DesignerProductsContext.Provider>
  );
}
