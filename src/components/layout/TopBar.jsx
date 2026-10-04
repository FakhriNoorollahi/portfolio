import { Stack, Typography } from "@mui/material";
import AppButtonIcon from "../../ui/AppButtonIcon";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function TopBar() {
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

      <AppButtonIcon
        sx={{ border: "1px solid", borderColor: "border.default" }}
      >
        <LightModeOutlinedIcon />
      </AppButtonIcon>
    </Stack>
  );
}

export default TopBar;
