import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useProducts } from "../../context/products/useProducts";
import AppDialog from "../../ui/AppDialog";
import { saveDataLocalStorage } from "../../hooks/useLocalStorage";
import { CATEGORIES } from "./constants/productConst";
import AppBreadcrumbs from "../../ui/AppBreadcrumbs";
import { getCategoryPath } from "./utils/pathCategorioes";

function AddCategoryModal({ setOpen }) {
  const [categoryName, setCategoryName] = useState("");

  const { categories, setCategories, selectedCategory } = useProducts();

  const breadcrumbItems = getCategoryPath(categories, selectedCategory);

  const onHandleConfirm = () => {
    const newCategories = [
      ...categories,
      {
        id: categoryName,
        name: categoryName,
        parentId: selectedCategory,
      },
    ];

    saveDataLocalStorage(CATEGORIES, newCategories);
    setCategories(newCategories);
    setOpen(false);
  };

  return (
    <AppDialog
      open={open}
      handleClose={() => setOpen(false)}
      confirmText="Add"
      title="Add New Category"
      handleConfirm={onHandleConfirm}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <AppBreadcrumbs items={breadcrumbItems.map((item) => item.name)} />
      </Box>
      <Stack spacing={2}>
        <TextField
          label="New Category Name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
      </Stack>
    </AppDialog>
  );
}

export default AddCategoryModal;
