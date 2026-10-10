export default function TypographyElement({ text = "New heading" }) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: "24px",
        fontWeight: 600,
        color: "#1f2937",
      }}
    >
      {text}
    </p>
  );
}
