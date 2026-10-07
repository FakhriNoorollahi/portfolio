import { Box, Grid, Paper } from "@mui/material";
import TopBar from "../features/layout/TopBar";
import SideBar from "../features/layout/SideBar";
import Header from "../features/layout/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
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
      <Grid container sx={{ marginTop: "50px" }} spacing={2}>
        <Grid size={3} />
        <Grid size={9}>
          <Header />
        </Grid>
        <Grid size={3}>
          <SideBar />
        </Grid>
        <Grid size={9}>
          <Paper elevation={0} sx={{ height: "100%", py: "22px", px: "72px" }}>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainLayout;
