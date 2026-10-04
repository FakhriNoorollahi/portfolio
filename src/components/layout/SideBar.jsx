import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import AppButtonIcon from "../../ui/AppButtonIcon";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import React from "react";
import AppButton from "../../ui/AppButton";
import DownloadIcon from "@mui/icons-material/Download";

const MEDIA_BUTTONS = [
  {
    id: 1,
    icon: <LinkedInIcon sx={{ color: "#1877F2" }} />,
    href: "https://www.linkedin.com/in/fakhri-noorollahi/",
  },
  {
    id: 2,
    icon: <GitHubIcon sx={{ color: "text.primary" }} />,
    href: "https://github.com/FakhriNoorollahi",
  },
];

const USER_INFO = [
  {
    id: 1,
    label: "Phone",
    text: "09051696125",
    icon: <PhoneIphoneOutlinedIcon />,
  },
  {
    id: 2,
    label: "Email",
    text: "noorollahi.fakhri@gmail.com",
    icon: <MailOutlinedIcon />,
  },
  {
    id: 3,
    label: "Location",
    text: "Iran, Gorgan",
    icon: <FmdGoodOutlinedIcon />,
  },
];

function SideBar() {
  return (
    <Paper
      elevation={0}
      sx={{
        py: "35px",
        position: "relative",
      }}
    >
      <Avatar
        src="/images/profile.jpg"
        alt="Profile"
        variant="rounded"
        sx={{
          width: 110,
          height: 110,
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
      <Stack sx={{ alignItems: "center", mt: "35px" }}>
        <Typography variant="h6" color="text.primary">
          Fakhri Noorollahi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          FrontEnd Developer
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          sx={{ marginTop: "6px", marginBottom: "22px" }}
        >
          {MEDIA_BUTTONS.map((item) => (
            <AppButtonIcon
              sx={{
                backgroundColor: "background.primary",
              }}
              color={item.color}
              key={item.id}
              type="link"
              href={item.href}
            >
              {item.icon}
            </AppButtonIcon>
          ))}
        </Stack>

        <List
          sx={{
            backgroundColor: "background.primary",
            borderRadius: "10px",
          }}
        >
          {USER_INFO.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      color: "text.secondary",
                    },
                    "& .MuiListItemText-secondary": {
                      color: "text.primary",
                    },
                  }}
                />
              </ListItem>
              {index < USER_INFO.length - 1 && (
                <Divider
                  component="li"
                  sx={{
                    mx: "25px",
                  }}
                />
              )}
            </React.Fragment>
          ))}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: 2,
            }}
          >
            <AppButton
              type="link"
              href="/resume.pdf"
              startIcon={<DownloadIcon />}
            >
              Download Resume
            </AppButton>
          </Box>
        </List>
      </Stack>
    </Paper>
  );
}

export default SideBar;
