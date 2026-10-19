import { Box, Typography } from "@mui/material";

export default function ColumnElement({ label, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0",
        minWidth: 0,
        minHeight: "160px",
        gap: 2,
        p: 2,
        border: "1px dashed #818cf8",
        borderRadius: 2,
        backgroundColor: "#f8faff",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      {children}
    </Box>
  );
}
