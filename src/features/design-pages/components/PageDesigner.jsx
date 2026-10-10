import { Box, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";

const initialPage = {
  id: "page-1",
  name: "صفحه جدید",
  elements: [
    {
      id: "stack-1",
      type: "stack",
      direction: "row",
      children: [
        {
          id: "text-1",
          type: "text",
          content: "سلام! این یک متن نمونه است.",
        },
        {
          id: "image-1",
          type: "image",
          src: "https://placehold.co/160x100",
        },
      ],
    },
  ],
};

function createElement(type) {
  const id = new Date().getTime();

  switch (type) {
    case "stack":
      return {
        id,
        type: "stack",
        direction: "row",
        children: [],
      };

    case "text":
      return {
        id,
        type: "text",
        content: "متن جدید",
      };

    case "image":
      return {
        id,
        type: "image",
        src: "https://placehold.co/160x100",
      };

    default:
      return null;
  }
}

function handleDragStart(event, type) {
  event.dataTransfer.setData("elementType", type);
  event.dataTransfer.effectAllowed = "copy";
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
}

function addElementToTree(elements, parentId, newElement) {
  if (parentId === null) {
    return [...elements, newElement];
  }

  return elements.map((element) => {
    if (element.id === parentId && element.type === "stack") {
      return {
        ...element,
        children: [...element.children, newElement],
      };
    }

    if (element.type === "stack") {
      return {
        ...element,
        children: addElementToTree(element.children, parentId, newElement),
      };
    }

    return element;
  });
}

function ElementRenderer({ element, handleDrop }) {
  switch (element.type) {
    case "stack":
      return (
        <Box
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, element.id)}
          sx={{
            display: "flex",
            flexDirection: element.direction,
            gap: 2,
            alignItems: "flex-start",
            minHeight: 80,
            border: "1px dashed #aaa",
            p: 2,
          }}
        >
          {element.children.map((child) => (
            <ElementRenderer
              key={child.id}
              element={child}
              handleDrop={handleDrop}
            />
          ))}
        </Box>
      );

    case "text":
      return <Typography>{element.content}</Typography>;

    case "image":
      return (
        <Box
          component="img"
          src={element.src}
          alt=""
          sx={{
            width: 160,
            height: 100,
            objectFit: "cover",
          }}
        />
      );

    default:
      return null;
  }
}

function PageDesigner() {
  const [page, setPage] = useState(initialPage);

  const handleDrop = (event, parentId = null) => {
    event.preventDefault();
    event.stopPropagation();

    const type = event.dataTransfer.getData("elementType");
    console.log("Drop target:", parentId, "Element type:", type);
    if (!type) return;

    const newElement = createElement(type);
    if (!newElement) return;

    setPage((currentPage) => ({
      ...currentPage,
      elements: addElementToTree(currentPage.elements, parentId, newElement),
    }));
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "220px minmax(0, 1fr) 240px",
        gap: 2,
        height: "80vh",
        p: 2,
        bgcolor: "#f5f5f5",
      }}
    >
      {/* پنل عناصر */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Elements</Typography>
        <Divider sx={{ my: 2 }} />

        {["stack", "text", "image"].map((type) => (
          <Box
            key={type}
            draggable
            onDragStart={(event) => handleDragStart(event, type)}
            sx={{
              p: 1.5,
              mb: 1,
              border: "1px solid #ddd",
              borderRadius: 1,
              cursor: "grab",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            {type.toUpperCase()}
          </Box>
        ))}
      </Paper>

      {/* فضای طراحی */}
      <Paper sx={{ p: 2, overflow: "auto" }}>
        <Typography variant="h6">{page.name}</Typography>
        <Divider sx={{ my: 2 }} />

        <Box
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event)}
          sx={{
            minHeight: 400,
            bgcolor: "white",
            p: 2,
          }}
        >
          {page.elements.map((element) => (
            <ElementRenderer
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, element.id)}
              key={element.id}
              element={element}
              handleDrop={handleDrop}
            />
          ))}
        </Box>
      </Paper>

      {/* پنل تنظیمات */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Properties</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          یک عنصر را برای ویرایش انتخاب کنید.
        </Typography>
      </Paper>
    </Box>
  );
}

export default PageDesigner;
