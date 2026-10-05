import { Stack, Typography } from "@mui/material";

function SkillsHeader({ title }) {
  return (
    <Stack>
        
      <Typography variant="h6">{title}</Typography>
    </Stack>
  );
}

export default SkillsHeader;
