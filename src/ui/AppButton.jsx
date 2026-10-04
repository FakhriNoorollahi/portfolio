import { Button } from "@mui/material";

function AppButton({
  type = "button",
  variant = "contained",
  startIcon,
  children,
  href,
  sx,
}) {
  const isLink = type === "link";
  return (
    <Button
      component={isLink ? "a" : "button"}
      href={isLink ? href : undefined}
      download={isLink}
      variant={variant}
      startIcon={startIcon}
      sx={{
        fontSize: "11px",
        color: "background.default",
        borderRadius: "30px",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

export default AppButton;
