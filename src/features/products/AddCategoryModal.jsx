import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import AppAutocomplete from "../../ui/AppAutocomplete";
import { useProducts } from "../../context/products/useProducts";

function AddCategoryModal() {
  const [categoryName, setCategoryName] = useState("");
  const { categories } = useProducts();
  const newCategories = categories.map((item) => {
    return {
      label: item.name,
      id: item.id,
    };
  });

  return (
    <Stack spacing={2}>
      <TextField
        label="New Category Name"
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
      />
      <AppAutocomplete options={newCategories} />
    </Stack>
  );
}

export default AddCategoryModal;
