import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { handleImageChange } from "./PageDesigner";

export default function ElementEditor({ element, onPropChange }) {
  if (!element) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="text.secondary">
          ابتدا یک متن یا تصویر را از روی بوم انتخاب کن.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      {element.type === "typography" && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ویرایش متن
          </Typography>

          <TextField
            label="متن"
            value={element.props?.text ?? ""}
            onChange={(event) => onPropChange("text", event.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
        </>
      )}

      {element.type === "image" && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            تنظیم تصویر
          </Typography>

          <TextField
            label="آدرس تصویر (URL)"
            value={element.props?.src ?? ""}
            onChange={(event) => onPropChange("src", event.target.value)}
            fullWidth
            placeholder="https://example.com/image.jpg"
          />
        </>
      )}

      {element?.type === "image" && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            انتخاب تصویر
          </Typography>

          <Button variant="contained" component="label" fullWidth>
            انتخاب فایل از کامپیوتر
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                handleImageChange(file);
                event.target.value = "";
              }}
            />
          </Button>
        </Box>
      )}
    </Paper>
  );
}
