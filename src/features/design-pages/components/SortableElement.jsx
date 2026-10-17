import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";

function SortableElement({ id, index, group, type, children }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group,
    type,
    accept: ["stack", "image", "typography"],
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

export default SortableElement;
