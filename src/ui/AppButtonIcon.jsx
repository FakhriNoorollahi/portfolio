import { IconButton } from "@mui/material";

function AppButtonIcon({ type = "button", sx, href, children }) {
  const isLink = type === "link";

  return (
    <IconButton
      component={isLink ? "a" : "button"}
      href={isLink ? href : undefined}
      sx={{ backgroundColor: "palette.background.default", ...sx }}
    >
      {children}
    </IconButton>
  );
}

export default AppButtonIcon;
