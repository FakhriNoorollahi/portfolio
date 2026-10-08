import { Breadcrumbs, Typography } from "@mui/material";

function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item) => (
        <Typography sx={{ color: "text.primary" }}>{item}</Typography>
      ))}
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;
