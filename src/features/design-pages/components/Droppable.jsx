import { useDroppable } from "@dnd-kit/react";
import Box from "@mui/material/Box";
import { CollisionPriority } from "@dnd-kit/abstract";

function Droppable({ id, children }) {
  const isCanvas = id === "canvas";
  const { ref } = useDroppable({
    id,
    collisionPriority: isCanvas ? CollisionPriority.Low : CollisionPriority.Low,
  });

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
