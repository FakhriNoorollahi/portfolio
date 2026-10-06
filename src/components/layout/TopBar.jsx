import { Stack, Typography } from "@mui/material";
import AppButtonIcon from "../../ui/AppButtonIcon";
import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Typography variant="h6">My</Typography>
        <Typography variant="h6" color="primary">
          Portfolio
        </Typography>
      </Stack>

      <Stack spacing={3} direction="row">
        <AppButtonIcon
          sx={{ border: "1px solid", borderColor: "border.default" }}
          handler={() => navigate("/")}
        >
          <HomeIcon />
        </AppButtonIcon>
        <AppButtonIcon
          sx={{ border: "1px solid", borderColor: "border.default" }}
          handler={() => navigate("/products")}
        >
          <ProductionQuantityLimitsIcon />
        </AppButtonIcon>
      </Stack>
    </Stack>
  );
}

export default TopBar;
