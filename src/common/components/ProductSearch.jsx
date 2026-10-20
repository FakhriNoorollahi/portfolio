import { TextField } from "@mui/material";
import { useProducts } from "../../context/products/useProducts";
import { useDesignerProducts } from "../../context/DesignerProducts/useDesignerProducts";

export default function ProductSearch({ mode = "default" }) {
  if (mode === "designer") {
    return <DesignerSearchInput />;
  }

  return <DefaultSearchInput />;
}

function DefaultSearchInput() {
  const { searchInput, setSearchInput } = useProducts();

  return (
    <TextField
      label="Search"
      placeholder="جست‌وجوی محصول..."
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      fullWidth
      size="small"
      sx={{
        backgroundColor: "#fff",
        border: "none",
        width: "50%",
      }}
    />
  );
}

function DesignerSearchInput() {
  const { searchInput, setSearchInput } = useDesignerProducts();

  return (
    <TextField
      label="Search"
      placeholder="جست‌وجوی محصول..."
      value={searchInput}
      onChange={(event) => setSearchInput(event.target.value)}
      fullWidth
      size="small"
      sx={{
        backgroundColor: "#fff",
        border: "none",
        width: "50%",
      }}
    />
  );
}
