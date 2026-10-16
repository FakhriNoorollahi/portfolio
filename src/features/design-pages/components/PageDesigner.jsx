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
import deleteElement from "../utils/deleteElements.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../../hooks/useLocalStorage.js";
import SortableStackItems from "./SortableStackItems.jsx";
import { isSortable } from "@dnd-kit/react/sortable";
import { reorderStackChildren } from "../utils/reorderStackChildren.js";

const PAGE_DESIGNS = "page_designs";

function PageDesigner() {
  const { id: pageId } = useParams();
  const navigate = useNavigate();
  const [elements, setElements] = useState(() => {
    const savedDesigns = getDataLocalStorage(PAGE_DESIGNS) || {};
    return savedDesigns[pageId] || [];
  });
  const [selectedElementId, setSelectedElementId] = useState(null);

  const selectedElement = findElement(elements, selectedElementId);

  function handleSaveDesign() {
    if (!pageId) return;

    const savedDesigns = getDataLocalStorage(PAGE_DESIGNS) || {};

    const updatedDesigns = {
      ...savedDesigns,
      [pageId]: elements,
    };

    saveDataLocalStorage(PAGE_DESIGNS, updatedDesigns);

    navigate("/managment-menu");
  }

  function handlePropChange(propName, value) {
    setElements((current) =>
      updateElement(current, selectedElementId, propName, value),
    );
  }

  function handleDeleteElement() {
    if (selectedElementId === null) return;

    setElements((current) => deleteElement(current, selectedElementId));

    setSelectedElementId(null);
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
    console.log(source);

    if (isSortable(source)) {
      const { initialIndex, index, group } = source;
      console.log(elements[0].children, initialIndex, index);

      if (group == null || initialIndex === index) return;

      setElements((previous) =>
        reorderStackChildren(previous, group, initialIndex, index),
      );

      return;
    }

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

    console.log(targetId);

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
              {element.children.map((child, index) => (
                <SortableStackItems
                  group={`stack-${element.id}`}
                  key={child.id}
                  id={child.id}
                  index={index}
                >
                  {renderElement(child)}
                </SortableStackItems>
              ))}
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
    <Box>
      <Button
        sx={{ marginY: "20px" }}
        variant="contained"
        onClick={handleSaveDesign}
      >
        ذخیره طراحی
      </Button>
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
                onChange={(event) =>
                  handlePropChange("text", event.target.value)
                }
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
                  +
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

            {selectedElement && (
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleDeleteElement}
              >
                حذف عنصر انتخاب‌شده
              </Button>
            )}
          </Grid>
        </DragDropProvider>
      </Grid>
    </Box>
  );
}

export default PageDesigner;
