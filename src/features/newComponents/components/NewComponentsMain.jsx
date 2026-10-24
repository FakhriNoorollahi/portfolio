import TypographyElement from "../../design-pages/components/TypographyElement.jsx";
import ImageElement from "../../design-pages/components/ImageElement.jsx";
import StackElement from "../../design-pages/components/stackElement.jsx";
import ColumnsElement from "../../design-pages/components/ColumnsElement.jsx";
import ProductSearch from "../../../common/components/ProductSearch.jsx";
import ProductsTableDesign from "../../design-pages/components/ProductsTableDesign.jsx";
import ColumnElement from "../../design-pages/components/ColumnElement.jsx";

function NewComponentsMain({ elements = [] }) {
  console.log(elements);
  function renderElement(element) {
    if (!element?.id || !element?.type) return null;

    const children = Array.isArray(element.children) ? element.children : [];

    switch (element.type) {
      case "stack":
        return (
          <StackElement key={element.id}>
            {children.map(renderElement)}
          </StackElement>
        );

      case "typography":
        return (
          <TypographyElement
            key={element.id}
            text={element.props?.text || "New heading"}
          />
        );

      case "columns":
        return (
          <ColumnsElement key={element.id} gap={element.props?.gap ?? 16}>
            {children.map(renderElement)}
          </ColumnsElement>
        );

      case "column":
        return (
          <ColumnElement key={element.id} label={element.props?.label}>
            {children.map(renderElement)}
          </ColumnElement>
        );

      case "image":
        return (
          <ImageElement
            key={element.id}
            src={element.props?.src || ""}
            alt={element.props?.alt || "Image"}
          />
        );

      case "productSearch":
        return <ProductSearch key={element.id} mode="designer" />;

      case "productsTable":
        return <ProductsTableDesign key={element.id} />;

      default:
        return null;
    }
  }

  return <>{elements.map(renderElement)}</>;
}

export default NewComponentsMain;
