import { useDroppable } from "@dnd-kit/react";
import Box from "@mui/material/Box";

function Droppable({ id, children }) {
  const { ref } = useDroppable({
    id,
  });

  const isCanvas = id === "canvas";

  return (
    <Box
      ref={ref}
      sx={
        isCanvas
          ? {
              minHeight: "400px",
              padding: "20px",
              border: "2px dashed gray",
            }
          : {
              display: "flex",
              minWidth: 0,
              minHeight: "80px",
            }
      }
    >
      {children}
    </Box>
  );
}

export default Droppable;
