import { Paper, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import AppButton from "../../ui/AppButton";
import { NavLink } from "react-router-dom";

const Nav_ITEMS = [
  {
    id: 1,
    label: "Home",
    icon: <HomeOutlinedIcon />,
    to: "/home",
  },
  {
    id: 2,
    label: "Resume",
    icon: <ArticleOutlinedIcon />,
    to: "/resume",
  },
  {
    id: 3,
    label: "Skills",
    icon: <LaptopMacOutlinedIcon />,
    to: "/skills",
  },
  {
    id: 4,
    label: "Contact",
    icon: <ContactPhoneOutlinedIcon />,
    to: "/contact",
  },
];

function Header() {
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "background.primary",
        width: "max-content",
        py: "10px",
        px: "22px",
        ml: "auto",
      }}
    >
      <Stack direction="row" spacing={4}>
        {Nav_ITEMS.map((item) => (
          <NavLink
            to={item.to}
            key={item.id}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {({ isActive }) => (
              <AppButton
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "10px",
                  boxShadow: "none",
                  fontSize: "8px",
                  color: isActive ? "background.default" : "text.main",
                  backgroundColor: isActive
                    ? "primary.main"
                    : "header.background",
                  "&:hover": {
                    boxShadow: "none",
                  },
                }}
              >
                {item.icon}
                {item.label}
              </AppButton>
            )}
          </NavLink>
        ))}
      </Stack>
    </Paper>
  );
}

export default Header;
