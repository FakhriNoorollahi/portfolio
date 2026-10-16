import { useSortable } from "@dnd-kit/react/sortable";

function SortableStackItems({ id, index, children, group }) {
  const { ref } = useSortable({ id, index, group });

  return <div ref={ref}>{children}</div>;
}

export default SortableStackItems;
