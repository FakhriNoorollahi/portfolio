import { DragDropProvider } from "@dnd-kit/react";
import { useEffect, useState } from "react";
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
import { isSortable } from "@dnd-kit/react/sortable";
import SortableElement from "./SortableElement.jsx";
import reorderElements from "../utils/reorderElements.js";
import { createColumns } from "../utils/createColumns.js";
import ColumnElement from "./ColumnElement.jsx";
import ColumnsElement from "./ColumnsElement.jsx";
import ProductSearch from "../../../common/components/ProductSearch.jsx";
import ProductsTableDesign from "./ProductsTableDesign.jsx";
import { getPageById, updatePage } from "../../../../server/pages.js";

// const PAGE_DESIGNS = "page_designs";

function PageDesigner() {
  const { id: pageId } = useParams();
  const navigate = useNavigate();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedElementId, setSelectedElementId] = useState(null);

  const selectedElement = findElement(elements, selectedElementId);

  useEffect(() => {
    let cancelled = false;

    async function loadPage() {
      setIsLoading(true);
      setLoadError("");

      try {
        const page = await getPageById(pageId);

        if (!cancelled) {
          setElements(page.elements || []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load page:", error);
          setLoadError("بارگذاری صفحه ناموفق بود.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    function loadError() {
      setLoadError("شناسه صفحه مشخص نیست.");
      setIsLoading(false);
    }

    if (pageId) {
      loadPage();
    } else {
      loadError();
    }

    return () => {
      cancelled = true;
    };
  }, [pageId]);

  async function handleSaveDesign() {
    if (!pageId) return;

    try {
      await updatePage(pageId, { elements, status: "published" });

      navigate("/managment-menu");
    } catch (error) {
      console.error("Failed to save design:", error);
      alert("ذخیره طراحی ناموفق بود.");
    }
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

    if (!source || !target) return;

    if (isSortable(source)) {
      let targetGroup;
      let targetIndex;

      if (isSortable(target)) {
        targetGroup = target.group;
        targetIndex = target.index;
      } else {
        const targetId = String(target.id);

        if (targetId === "canvas") {
          targetGroup = "canvas";
          targetIndex = elements.length;
        } else if (
          targetId.startsWith("stack-") ||
          targetId.startsWith("column-")
        ) {
          targetGroup = targetId;
          targetIndex = Number.MAX_SAFE_INTEGER;
        } else {
          return;
        }
      }

      if (targetGroup == null) return;

      setElements((previous) =>
        reorderElements(previous, targetGroup, source.id, targetIndex),
      );

      return;
    }

    const type = source.data?.type;

    if (
      ![
        "typography",
        "image",
        "stack",
        "columns",
        "productsTable",
        "productSearch",
        "productCount",
      ].includes(type)
    ) {
      return;
    }

    const defaultProps = {
      typography: { text: "متن نمونه" },
      image: { src: "", alt: "تصویر" },
      stack: {},
      productsTable: {
        title: "محصولات",
      },
      productSearch: {
        placeholder: "جست‌وجوی محصول...",
      },
      productCount: {
        label: "تعداد محصولات",
      },
    };

    if (type === "columns") {
      const newColumns = createColumns(3, 16);
      const targetId = String(target.id);

      if (targetId === "canvas") {
        setElements((current) => [...current, newColumns]);
      }

      return;
    }

    const newElement = {
      id: crypto.randomUUID(),
      type,
      props: { ...defaultProps[type] },
      children: [],
    };

    console.log(newElement);

    const targetId = String(target.id);

    if (targetId === "canvas") {
      setElements((current) => [...current, newElement]);
    } else if (targetId.startsWith("stack-")) {
      const stackId = targetId.slice("stack-".length);

      setElements((current) => addChildToStack(current, stackId, newElement));
    } else if (
      targetId.startsWith("column-") &&
      !targetId.startsWith("columns-")
    ) {
      const columnId = targetId.slice("column-".length);

      setElements((current) => addChildToStack(current, columnId, newElement));
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

        {element.type === "columns" && (
          <Droppable id={`columns-${element.id}`}>
            <ColumnsElement gap={element.props?.gap ?? 16}>
              {element.children.map((column, index) => (
                <SortableElement
                  key={column.id}
                  id={column.id}
                  index={index}
                  group={`columns-${element.id}`}
                  type="column"
                >
                  {renderElement(column)}
                </SortableElement>
              ))}
            </ColumnsElement>
          </Droppable>
        )}

        {element.type === "column" && (
          <Droppable id={`column-${element.id}`}>
            <ColumnElement label={element.props?.label}>
              {element.children.map((child, index) => (
                <SortableElement
                  key={child.id}
                  id={child.id}
                  index={index}
                  group={`column-${element.id}`}
                  type={child.type}
                >
                  {renderElement(child)}
                </SortableElement>
              ))}
            </ColumnElement>
          </Droppable>
        )}

        {element.type === "image" && (
          <ImageElement
            src={element.props?.src || ""}
            alt={element.props?.alt || "Image"}
          />
        )}

        {element.type === "productSearch" && <ProductSearch mode="designer" />}

        {element.type === "productsTable" && <ProductsTableDesign />}

        {/* {element.type === "productCount" && <p>تعداد محصولات</p>} */}
      </div>
    );
  }

  if (isLoading) {
    return <div>در حال بارگذاری صفحه...</div>;
  }

  if (loadError) {
    return <div>{loadError}</div>;
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
