import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../features/layout/TopBar";

function ProductsLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.primary",
        px: "90px",
        py: "50px",
      }}
    >
      <TopBar />
      <Outlet />
    </Box>
  );
}

export default ProductsLayout;
