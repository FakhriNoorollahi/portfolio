import { Box, CircularProgress } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useProducts } from "../../context/products/useProducts";

function ProductsCategories() {
  const { categories, isLoadingCategory, category, setSearchParams } =
    useProducts();

  const renderCategories = (id) => {
    const childrenCategories = categories.filter((c) => c.parentId === id);

    return (
      <>
        {childrenCategories.map((c) => (
          <TreeItem key={c.id} itemId={c.id} label={c.name}>
            {renderCategories(c.id)}
          </TreeItem>
        ))}
      </>
    );
  };

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
          {categories
            .filter((c) => c.parentId === null)
            .map((pCategory) => (
              <TreeItem
                key={pCategory.id}
                itemId={pCategory.id}
                label={pCategory.name}
              >
                {renderCategories(pCategory.id)}
              </TreeItem>
            ))}
        </SimpleTreeView>
      )}
    </Box>
  );
}

export default ProductsCategories;
