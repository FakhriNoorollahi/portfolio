import { ProductsContext } from "../products/ProductsContext";

function ProductsSSRProvider({ children, initialProducts }) {
  const value = {
    products: initialProducts,
    isLoading: false,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsSSRProvider;
