export function createColumns(count = 3, gap = 16) {
  return {
    id: crypto.randomUUID(),
    type: "columns",
    props: {
      count,
      gap,
    },
    children: Array.from({ length: count }, (_, index) => ({
      id: crypto.randomUUID(),
      type: "column",
      props: {
        label: `ستون ${index + 1}`,
      },
      children: [],
    })),
  };
}
