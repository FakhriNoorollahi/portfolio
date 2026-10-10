import { Breadcrumbs, Typography } from "@mui/material";

function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item) => (
        <Typography sx={{ color: "text.primary" }}>{item.name}</Typography>
      ))}
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;
