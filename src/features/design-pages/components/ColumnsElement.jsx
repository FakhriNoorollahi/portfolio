import { Box } from "@mui/material";

export default function ColumnsElement({ gap = 16, children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        width: "100%",
        minWidth: 0,
        gap: `${gap}px`,
      }}
    >
      {children}
    </Box>
  );
}
