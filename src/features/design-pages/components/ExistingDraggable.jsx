import { useDraggable } from "@dnd-kit/react";

function ExistingDraggable({ element, children }) {
  const { ref } = useDraggable({
    id: `element-${element.id}`,
    data: {
      type: element.type,
      source: "canvas",
      elementId: element.id,
    },
  });

  return <div ref={ref}>{children}</div>;
}

export default ExistingDraggable;
