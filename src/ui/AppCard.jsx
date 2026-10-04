import { Card, CardContent, CardHeader } from "@mui/material";

function AppCard({
  hasHeader = true,
  title,
  avatar,
  children,
  cardSx,
  cardHeaderSx,
}) {
  return (
    <Card sx={{ borderRadius: "20px", boxShadow: "none", ...cardSx }}>
      {hasHeader && (
        <CardHeader sx={{ ...cardHeaderSx }} title={title} avatar={avatar} />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default AppCard;
