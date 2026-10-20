import { useMemo } from "react";
import { useDesignerProducts } from "../../../context/DesignerProducts/useDesignerProducts";
import { useProducts } from "../../../context/products/useProducts";

export function useDesignerProductData() {
  const { products, isLoading } = useProducts();

  const { searchInput, setSearchInput } = useDesignerProducts();

  const filteredProducts = useMemo(() => {
    const query = searchInput.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const searchableText = [
        product.title,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [products, searchInput]);

  return {
    products: filteredProducts,
    total: filteredProducts.length,
    isLoading,
    searchInput,
    setSearchInput,
  };
}
