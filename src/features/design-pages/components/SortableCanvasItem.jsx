import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";

function SortableCanvasItem({ id, index, children }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "stack",
    group: "canvas",
    accept: ["stack"],
  });

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        marginBottom: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default SortableCanvasItem;
