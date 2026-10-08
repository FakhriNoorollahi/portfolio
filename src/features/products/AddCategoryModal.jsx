import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import AppAutocomplete from "../../ui/AppAutocomplete";
import { useProducts } from "../../context/products/useProducts";
import AppDialog from "../../ui/AppDialog";
import { saveDataLocalStorage } from "../../hooks/useLocalStorage";
import { CATEGORIES } from "./constants/productConst";

function AddCategoryModal({ setOpen }) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { categories, setCategories } = useProducts();
  const newCategories = categories.map((item) => {
    return {
      label: item.name,
      id: item.id,
    };
  });

  const onHandleConfirm = () => {
    const { id } = selectedCategory;
    const newCategories = [
      ...categories,
      {
        id: new Date().getTime() * Math.random(),
        name: categoryName,
        parentId: id,
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
      <Stack spacing={2}>
        <TextField
          label="New Category Name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
        <AppAutocomplete
          selected={selectedCategory}
          handler={(event, newValue) => {
            setSelectedCategory(newValue);
          }}
          options={newCategories}
        />
      </Stack>
    </AppDialog>
  );
}

export default AddCategoryModal;
