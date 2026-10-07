import { Avatar, Stack, Typography } from "@mui/material";

function ResumeTitle({ text, icon }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ direction: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      <Avatar sx={{ bgcolor: "background.default" }}>{icon}</Avatar>
      <Typography variant="h5">{text}</Typography>
    </Stack>
  );
}

export default ResumeTitle;
