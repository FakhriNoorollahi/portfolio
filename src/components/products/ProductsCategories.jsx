import { Box, CircularProgress } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useProducts } from "../../context/products/useProducts";

function ProductsCategories() {
  const { categories, isLoadingCategory, category, setSearchParams } =
    useProducts();
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      {isLoadingCategory ? (
        <CircularProgress aria-label="Loading…" />
      ) : (
        <SimpleTreeView
          selectedItems={category?.toString()}
          onSelectedItemsChange={(event, itemId) => {
            setSearchParams({
              category: itemId,
              page: "1",
            });
          }}
        >
          {categories?.map((c) => (
            <TreeItem key={c.slug} itemId={c.slug} label={c.name} />
          ))}
        </SimpleTreeView>
      )}
    </Box>
  );
}

export default ProductsCategories;
