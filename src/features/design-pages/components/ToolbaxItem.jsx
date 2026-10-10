import { useDraggable } from "@dnd-kit/react";
import Box from "@mui/material/Box";

const style = {
  border: "1px dashed black",
  padding: "5px",
  marginBottom: "10px",
};

function ToolbaxItem({ type, label }) {
  const { ref } = useDraggable({
    id: `palette-${type}`,
    data: {
      type,
      source: "palette",
    },
  });
  return (
    <Box sx={style} ref={ref} type="button" className="palette-item">
      {label}
    </Box>
  );
}

export default ToolbaxItem;
