import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import Grid from "@mui/material/Grid";
import StackElement from "./stackElement";
import TypographyElement from "./TypographyElement.jsx";
import ImageElement from "./ImageElement.jsx";
import addChildToStack from "../utils/addChildToStack.js";
import { Box, Button, TextField, Typography } from "@mui/material";
import findElement from "../utils/finElement.js";
import updateElement from "../utils/updateElement.js";

function PageDesigner() {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const selectedElement = findElement(elements, selectedElementId);

  function handlePropChange(propName, value) {
    setElements((current) =>
      updateElement(current, selectedElementId, propName, value),
    );
  }

  function handleImageChange(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری انتخاب کن.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      handlePropChange("src", reader.result);
    };

    reader.readAsDataURL(file);
  }

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

    const defaultProps = {
      typography: {
        text: "متن نمونه",
      },
      image: {
        src: "",
        alt: "تصویر",
      },
      stack: {},
    };

    const newElement = {
      id: new Date().getTime(),
      type,
      props: { ...defaultProps[type] },
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
      <div
        key={element.id}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedElementId(element.id);
        }}
        style={{
          marginBottom: "16px",
          outline:
            selectedElementId === element.id ? "2px solid #1976d2" : "none",
        }}
      >
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

        <Grid size={7}>
          <Droppable id="canvas">
            {elements.map((element) => renderElement(element))}
          </Droppable>
        </Grid>
        <Grid size={3}>
          {selectedElement?.type === "typography" && (
            <TextField
              label="متن"
              value={selectedElement.props?.text ?? ""}
              onChange={(event) => handlePropChange("text", event.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
          )}

          {selectedElement?.type === "image" && (
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
        </Grid>
      </DragDropProvider>
    </Grid>
  );
}

export default PageDesigner;
