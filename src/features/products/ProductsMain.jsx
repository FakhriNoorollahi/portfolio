import { Box, Grid } from "@mui/material";
import ProductsTable from "./ProductsTable";
import ProductsCategories from "./ProductsCategories";
import AppBreadcrumbs from "../../ui/AppBreadcrumbs";
import { useProducts } from "../../context/products/useProducts";

function ProductsMain() {
  const { category } = useProducts();

  return (
    <Box>
      <AppBreadcrumbs items={["Home", "Products", `${category}`]} />
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
