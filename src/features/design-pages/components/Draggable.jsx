import Paper from "@mui/material/Paper";
import ToolbaxItem from "./ToolbaxItem";

const TOOLBOXITEMS = [
  {
    type: "typography",
    label: "متن",
    defaultProps: { text: "متن نمونه", fontSize: 24, color: "#000" },
  },
  {
    type: "image",
    label: "تصویر",
    defaultProps: { src: "https://placehold.co/200x150", alt: "تصویر" },
  },
  {
    type: "stack",
    label: "استک",
    defaultProps: { direction: "horizontal", gap: 12, padding: 16 },
    acceptsChildren: true,
  },
];

export function Draggable() {
  return (
    <Paper sx={{ height: "100%", padding: "5px" }}>
      {TOOLBOXITEMS.map((item) => (
        <ToolbaxItem key={item.type} type={item.type} label={item.label} />
      ))}
    </Paper>
  );
}

export default Draggable;
