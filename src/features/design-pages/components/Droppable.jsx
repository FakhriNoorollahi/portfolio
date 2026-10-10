import { useDroppable } from "@dnd-kit/react";
import Paper from "@mui/material/Paper";

function Droppable({ children }) {
  const { ref } = useDroppable({
    id: "draggable",
  });

  return (
    <Paper
      ref={ref}
      style={{
        minHeight: "400px",
        padding: "20px",
        border: "2px dashed gray",
      }}
    >
      {children}
    </Paper>
  );
}

export default Droppable;
