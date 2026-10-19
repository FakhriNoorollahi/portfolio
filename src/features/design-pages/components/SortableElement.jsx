import { useSortable } from "@dnd-kit/react/sortable";
import { SortableKeyboardPlugin } from "@dnd-kit/dom/sortable";
import { Box } from "@mui/material";

function SortableElement({ id, index, group, type, children }) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    group,
    type,
    accept:
      group === "canvas"
        ? ["stack", "image", "typography"]
        : ["image", "typography"],
    plugins: [SortableKeyboardPlugin],
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
