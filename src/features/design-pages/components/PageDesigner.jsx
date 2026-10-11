import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Grid from "@mui/material/Grid";
import StackElement from "./stackElement";
import TypographyElement from "./TypographyElement.jsx";
import ImageElement from "./ImageElement.jsx";
import addChildToStack from "../utils/addChildToStack.js";

function PageDesigner() {
  const [elements, setElements] = useState([]);

  function handleDragEnd(event) {
    if (event.canceled) return;

    const { source, target } = event.operation;

    if (!target) {
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

    const targetId = target.id;

    if (targetId === "canvas") {
      setElements((current) => [...current, newElement]);
      return;
    }

    if (targetId.startsWith("stack-")) {
      const stackId = targetId.slice("stack-".length);

      setElements((current) => addChildToStack(current, stackId, newElement));
    }
  }

  function renderElement(element) {
    return (
      <div key={element.id} style={{ marginBottom: "16px" }}>
        {element.type === "stack" && (
          <Droppable id={`stack-${element.id}`}>
            <StackElement>
              {element.children.map((child) => renderElement(child))}
            </StackElement>
          </Droppable>
        )}

        {element.type === "typography" && (
          <TypographyElement text={element.props?.text || "New heading"} />
        )}

        {element.type === "image" && (
          <ImageElement
            src={element.props?.src || ""}
            alt={element.props?.alt || "Image"}
          />
        )}
      </div>
    );
  }

  return (
    <Grid container spacing={3} sx={{ height: "70vh", marginTop: "20px" }}>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <Grid size={2}>
          <Draggable />
        </Grid>

        <Grid size={10}>
          <Droppable id="canvas">
            {elements.map((element) => renderElement(element))}
          </Droppable>
        </Grid>
      </DragDropProvider>
    </Grid>
  );
}

export default PageDesigner;
