import { Button, Stack, Typography } from "@mui/material";

function TopBarSSR({ menuItems = [] }) {
  console.log(menuItems);

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 4,
      }}
    >
      <Stack direction="row" spacing={3}>
        {menuItems.map((item) => {
          const href =
            item.type === "WEB_PAGES"
              ? item.href
              : `http://localhost:5173/${item.link || ""}`;

          return (
            <Button
              key={`${item.type}-${item.id}`}
              component="a"
              href={href}
              variant="contained"
              sx={{
                fontSize: "11px",
                color: "background.default",
                borderRadius: "30px",
                backgroundColor: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {item.title}
            </Button>
          );
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

export default TopBarSSR;
