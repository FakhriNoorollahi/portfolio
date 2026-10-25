import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import TopBar from "../features/layout/TopBar";
import TopBarSSR from "../features/layout/TopBarSSR";

function ProductsLayout({ children, ssrMenuItems }) {
  const isSSR = Array.isArray(ssrMenuItems);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.primary",
        px: "90px",
        py: "50px",
      }}
    >
      {isSSR ? <TopBarSSR menuItems={ssrMenuItems} /> : <TopBar />}

      {children ?? <Outlet />}
    </Box>
  );
}

export default ProductsLayout;
