import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../theme";
import ProductsLayout from "../layouts/ProductsLayout";
import NewComponentsMain from "../features/NewComponents/components/NewComponentsMain";
import ProductsSSRProvider from "../context/ProductsSSR/ProductsSSRProvider";
import { DesignerProductsProvider } from "../context/DesignerProducts/DesignerProductsProvider";

export function PublishedPageApp({ initialData }) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ProductsSSRProvider initialProducts={initialData.initialProducts}>
          <DesignerProductsProvider>
            <ProductsLayout ssrMenuItems={initialData.allMenuItems}>
              <NewComponentsMain elements={initialData.elements} />
            </ProductsLayout>
          </DesignerProductsProvider>
        </ProductsSSRProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
