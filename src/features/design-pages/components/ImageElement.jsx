export default function ImageElement({ src = "", alt = "Image" }) {
  if (!src) {
    return (
      <div
        style={{
          width: "100px",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #9ca3af",
          borderRadius: "8px",
          background: "#f9fafb",
          color: "#6b7280",
        }}
      >
        Image placeholder
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        display: "block",
        width: "150px",
        height: "150px",
        borderRadius: "8px",
      }}
    />
  );
}
