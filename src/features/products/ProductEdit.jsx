import { Autocomplete, Stack, TextField } from "@mui/material";
import AppButton from "../../ui/AppButton";
import { useProducts } from "../../context/products/useProducts";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ProductEdit() {
  const { categories, products } = useProducts();
  const { id: productId } = useParams();

  const productCategory = products.find(
    (p) => Number(p.id) === +productId,
  ).category;

  const [currentCategory, setCurrentCategory] = useState(productCategory || "");

  const handleEditCategory = () => {
    console.log(currentCategory);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        value={currentCategory}
        onChange={(_event, newValue) => {
          setCurrentCategory(newValue);
        }}
        disablePortal
        options={categories.map((item) => ({ id: item.id, label: item.name }))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <AppButton sx={{ width: "100px" }} handler={handleEditCategory}>
        Edit
      </AppButton>
    </Stack>
  );
}

export default ProductEdit;
