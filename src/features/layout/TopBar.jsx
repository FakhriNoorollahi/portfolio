import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppButton from "../../ui/AppButton";

const NAV_ITEMS = [
  {
    id: 1,
    label: "خانه",
    link: "/",
  },
  {
    id: 2,
    label: "محصولات",
    link: "/products",
  },
  {
    id: 3,
    label: "طراحی صفحه",
    link: "/pages-list",
  },
  {
    id: 4,
    label: "مدیریت منوها",
    link: "/managment-menu",
  },
];

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
      <Stack spacing={3} direction="row">
        {NAV_ITEMS.map((p) => (
          <AppButton key={p.id} handler={() => navigate(p.link)}>
            {p.label}
          </AppButton>
        ))}
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6">My</Typography>
        <Typography variant="h6" color="primary">
          Portfolio
        </Typography>
      </Stack>
    </Stack>
  );
}

export default TopBar;
