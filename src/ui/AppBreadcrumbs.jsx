import { Breadcrumbs, Typography } from "@mui/material";
// import { Link } from "react-router-dom";

function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item) => (
        // <Link underline="hover" color="inherit" href={item.href}>
        //   {item}
        // </Link>
        <Typography sx={{ color: "text.primary" }}>{item}</Typography>
      ))}
      {/* <Typography sx={{ color: "text.primary" }}>{currentItem}</Typography> */}
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;
