export default function StackElement({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        minHeight: "80px",
        minWidth: "220px",
        padding: "16px",
        border: "2px dashed #818cf8",
        borderRadius: "8px",
        background: "#eef2ff",
      }}
    >
      {children}
    </div>
  );
}
