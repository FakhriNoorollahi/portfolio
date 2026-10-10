import { Box, Grid } from "@mui/material";
import ProductsTable from "./ProductsTable";
import ProductsCategories from "./ProductsCategories";
import AppBreadcrumbs from "../../ui/AppBreadcrumbs";
import { useProducts } from "../../context/products/useProducts";
import { getCategoryPath } from "./utils/pathCategorioes";

const PRODUCTS = { id: "products", name: "Products", parentId: null };
function ProductsMain() {
  const { categories, category } = useProducts();

  const path = getCategoryPath(categories, category);
  return (
    <Box>
      <AppBreadcrumbs items={[PRODUCTS, ...path]} />
      <Grid container sx={{ paddingY: "30px" }} spacing={2}>
        <Grid size={3}>
          <ProductsCategories />
        </Grid>
        <Grid size={9}>
          <ProductsTable />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductsMain;
