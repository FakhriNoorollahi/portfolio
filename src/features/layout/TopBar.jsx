import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppButton from "../../ui/AppButton";
import { useManageMenu } from "../../context/mangeMenu/useManageMenu";

function TopBar() {
  const navigate = useNavigate();

  const { menus, getMenus } = useManageMenu();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} direction="row">
        {menus?.map((item) => {
          const menusItems = getMenus(item.type) || [];
          if (!menusItems.length) return;
          return menusItems?.map((p) => {
            if (p?.isActive) {
              return (
                <AppButton key={p.id} handler={() => navigate(`/${p.link}`)}>
                  {p.title}
                </AppButton>
              );
            }
          });
        })}
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
