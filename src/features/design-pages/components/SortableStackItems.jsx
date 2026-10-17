import { useSortable } from "@dnd-kit/react/sortable";

function SortableStackItems({ id, index, children, group, type, column }) {
  const { ref } = useSortable({
    id,
    index,
    group,
    type,
    accept: ["stack", "image", "typography"],
    column,
  });

  return <div ref={ref}>{children}</div>;
}

export default SortableStackItems;
