import { Box, Grid, Stack } from "@mui/material";
import ProductsTable from "./ProductsTable";
import ProductsCategories from "./ProductsCategories";
import AppBreadcrumbs from "../../ui/AppBreadcrumbs";
import { useProducts } from "../../context/products/useProducts";
import { getCategoryPath } from "./utils/pathCategorioes";
import ProductSearch from "../../common/components/ProductSearch";
import AppButton from "../../ui/AppButton";
import AddCategoryModal from "./AddCategoryModal";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const PRODUCTS = { id: "products", name: "Products", parentId: null };
function ProductsMain() {
  const [open, setOpen] = useState(false);
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
          <Stack direction="row" spacing={2} sx={{ marginBottom: "20px" }}>
            <ProductSearch />
            <AppButton startIcon={<AddIcon />} handler={() => setOpen(true)}>
              Add Category
            </AppButton>
            {open && <AddCategoryModal setOpen={setOpen} />}
          </Stack>
          <ProductsTable />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductsMain;
