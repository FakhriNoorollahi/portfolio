import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Grid from "@mui/material/Grid";
import StackElement from "./stackElement";
import TypographyElement from "./TypographyElement.jsx";
import ImageElement from "./ImageElement.jsx";

function PageDesigner() {
  const [elements, setElements] = useState([]);

  function handleDragEnd(event) {
    if (event.canceled) return;

    const { source, target } = event.operation;

    console.log("Dragged item:", source);
    console.log("Drop target:", target);

    if (!target || target.id !== "draggable") {
      return;
    }

    const type = source.data?.type;

    if (!["typography", "image", "stack"].includes(type)) {
      return;
    }

    const newElement = {
      id: new Date().getTime(),
      type,
      props: {},
      children: [],
    };

    setElements((current) => [...current, newElement]);
  }

  return (
    <Grid container spacing={3} sx={{ height: "70vh", marginTop: "20px" }}>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <Grid size={2}>
          <Draggable />
        </Grid>

        <Grid size={10}>
          <Droppable id="droppable">
            {elements.map((element) => (
              <div key={element.id} style={{ marginBottom: "16px" }}>
                {element.type === "stack" && <StackElement />}

                {element.type === "typography" && (
                  <TypographyElement
                    text={element.props?.text || "New heading"}
                  />
                )}

                {element.type === "image" && (
                  <ImageElement
                    src={element.props?.src || ""}
                    alt={element.props?.alt || "Image"}
                  />
                )}
              </div>
            ))}
          </Droppable>
        </Grid>
      </DragDropProvider>
    </Grid>
  );
}

export default PageDesigner;
