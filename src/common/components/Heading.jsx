import { Box, Typography, Divider } from "@mui/material";

function Heading({ label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="h5">{label}</Typography>
      <Divider
        sx={{
          backgroundColor: "primary.main",
          width: "200px",
          height: "3px",
        }}
      />
    </Box>
  );
}

export default Heading;
