import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../theme";
import ProductsLayout from "../layouts/ProductsLayout";
import NewComponentsMain from "../features/NewComponents/components/NewComponentsMain";
import ProductDetailSSR from "../features/newComponents/components/ProductDetailSSR";

import ProductsSSRProvider from "../context/ProductsSSR/ProductsSSRProvider";
import { DesignerProductsProvider } from "../context/DesignerProducts/DesignerProductsProvider";

export function PublishedPageApp({ initialData }) {
  const isProductDetail = initialData.pageType === "product-detail";

  const pageContent = isProductDetail ? (
    <ProductDetailSSR initialData={initialData} />
  ) : (
    <ProductsSSRProvider initialProducts={initialData.initialProducts}>
      <DesignerProductsProvider>
        <NewComponentsMain elements={initialData.elements} />
      </DesignerProductsProvider>
    </ProductsSSRProvider>
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ProductsLayout ssrMenuItems={initialData.allMenuItems}>
          {pageContent}
        </ProductsLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
