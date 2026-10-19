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
import { isSortable } from "@dnd-kit/react/sortable";
import SortableElement from "./SortableElement.jsx";
import reorderElements from "../utils/reorderElements.js";

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
    console.log("savedDesigns", savedDesigns);
    console.log("elements", elements);
    console.log("updatedDesigns", updatedDesigns);

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

    deleteElement(elements, selectedElementId);

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

  // function handleDragEnd(event) {
  //   if (event.canceled) return;

  //   const { source, target } = event.operation;

  //   if (!target) return;

  //   if (isSortable(source)) {
  //     const { initialIndex, index, group, initialGroup, id } = source;

  //     if (group == null || initialIndex === index) return;

  //     console.log("DROP WITHOUT STATE UPDATE", {
  //       id,
  //       initialGroup,
  //       group,
  //       initialIndex,
  //       index,
  //       targetId: target?.id,
  //     });

  //     setElements((previous) => {
  //       const next = reorderElements(previous, group, id, index);

  //       console.log("PREVIOUS", previous);
  //       console.log("NEXT", next);
  //       return next;
  //     });

  //     return;
  //   }

  //   const type = source.data?.type;

  //   if (!["typography", "image", "stack"].includes(type)) {
  //     return;
  //   }

  //   const defaultProps = {
  //     typography: { text: "متن نمونه" },
  //     image: { src: "", alt: "تصویر" },
  //     stack: {},
  //   };

  //   const newElement = {
  //     id: crypto.randomUUID(),
  //     type,
  //     props: { ...defaultProps[type] },
  //     children: [],
  //   };

  //   const targetId = String(target.id);

  //   if (targetId === "canvas") {
  //     setElements((current) => [...current, newElement]);
  //     return;
  //   }

  //   if (targetId.startsWith("stack-")) {
  //     const stackId = targetId.slice("stack-".length);

  //     setElements((current) => addChildToStack(current, stackId, newElement));
  //   }
  // }

  function handleDragEnd(event) {
    if (event.canceled) return;

    const { source, target } = event.operation;

    if (!source || !target) return;

    // if (isSortable(source)) {
    //   const { initialIndex, index, group, initialGroup, id } = source;
    //   console.log("SORTABLE DROP", {
    //     id,
    //     initialGroup,
    //     group,
    //     initialIndex,
    //     index,
    //     targetId: target?.id,
    //   });

    //   if (group == null || initialGroup == null) return;

    //   const groupChanged = initialGroup !== group;
    //   const indexChanged = initialIndex !== index;

    //   if (!groupChanged && !indexChanged) return;

    //   setElements((previous) => {
    //     const n = reorderElements(previous, group, id, index);
    //     console.log(n);

    //     return n;
    //   });

    //   return;
    // }

    if (isSortable(source)) {
      let targetGroup;
      let targetIndex;

      if (isSortable(target)) {
        // Dropped over another sortable element
        targetGroup = target.group;
        targetIndex = target.index;
      } else {
        // Dropped over an empty canvas or stack container
        const targetId = String(target.id);

        if (targetId === "canvas") {
          targetGroup = "canvas";
          targetIndex = elements.length;
        } else if (targetId.startsWith("stack-")) {
          targetGroup = targetId;
          targetIndex = Number.MAX_SAFE_INTEGER;
        } else {
          return;
        }
      }

      if (targetGroup == null) return;

      setElements((previous) => {
        const a = reorderElements(
          previous,
          targetGroup,
          source.id,
          targetIndex,
        );
        console.log(previous);
        console.log(a);

        return a;
      });

      return;
    }

    const type = source.data?.type;

    if (!["typography", "image", "stack"].includes(type)) {
      return;
    }

    const defaultProps = {
      typography: { text: "متن نمونه" },
      image: { src: "", alt: "تصویر" },
      stack: {},
    };

    const newElement = {
      id: crypto.randomUUID(),
      type,
      props: { ...defaultProps[type] },
      children: [],
    };

    const targetId = String(target.id);

    if (targetId === "canvas") {
      setElements((current) => [...current, newElement]);
    } else if (targetId.startsWith("stack-")) {
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
      >
        {element.type === "stack" && (
          <Droppable id={`stack-${element.id}`}>
            <StackElement>
              {element.children.map((child, index) => (
                <SortableElement
                  key={child.id}
                  id={child.id}
                  index={index}
                  group={`stack-${element.id}`}
                  type={child.type}
                >
                  {renderElement(child)}
                </SortableElement>
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
              {elements.map((element, index) => (
                <SortableElement
                  key={element.id}
                  id={element.id}
                  index={index}
                  group="canvas"
                  type={element.type}
                >
                  {renderElement(element)}
                </SortableElement>
              ))}
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
