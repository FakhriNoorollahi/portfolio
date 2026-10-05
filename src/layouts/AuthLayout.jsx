import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (activeTab === 0) navigate("/auth/login");
    if (activeTab === 1) navigate("/auth/register");
  }, [activeTab, navigate]);

  return (
    <Box
      component="main"
      sx={{
        display: "grid",
        minHeight: "100vh",
        placeItems: "center",
        px: 2,
        py: 6,
        background:
          "linear-gradient(180deg, rgba(233,218,221,1) 0%, rgba(205,88,107,1) 100%)",
      }}
    >
      <Paper
        component="section"
        elevation={0}
        aria-labelledby="yourform-title"
        sx={{
          width: "100%",
          maxWidth: 625,
          minHeight: "max-content",
          px: { xs: 3, sm: 10 },
          py: "100px",
          borderRadius: "30px",
          boxShadow: "0px 0px 90px #00000017",
        }}
      >
        <Stack spacing={7}>
          <Typography
            id="yourform-title"
            component="h1"
            variant="h1"
            sx={{ lineHeight: "43px" }}
          >
            Yourform
          </Typography>
          <Stack onSubmit={handleSubmit} spacing={5} width="100%">
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              centered
              aria-label="Authentication options"
              sx={{
                minHeight: 38,
                borderBottom: "1px solid",
                borderColor: "divider",
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                  gap: 5,
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  backgroundColor: "primary.main",
                },
                "& .MuiTab-root": {
                  minWidth: 0,
                  minHeight: 38,
                  px: 3,
                  pb: "3px",
                  color: "text.disabled",
                  fontSize: "19px",
                  fontWeight: 500,
                  letterSpacing: "0.38px",
                  lineHeight: "34.2px",
                  textTransform: "none",
                },
                "& .Mui-selected": {
                  color: "text.secondary",
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <Outlet />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AuthLayout;
