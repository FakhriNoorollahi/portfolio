import { useParams } from "react-router-dom";
import { getDataLocalStorage } from "../../../hooks/useLocalStorage";
import { PAGE_DESIGNS } from "../../../constants/constants";
import TypographyElement from "../../design-pages/components/TypographyElement.jsx";
import ImageElement from "../../design-pages/components/ImageElement.jsx";
import StackElement from "../../design-pages/components/stackElement.jsx";
import { useManageMenu } from "../../../context/mangeMenu/useManageMenu.js";

function NewComponentsMain() {
  const { dynamicUrl } = useParams();

  const savedDesigns = getDataLocalStorage(PAGE_DESIGNS) || {};
  const { webPages } = useManageMenu();

  const currentPage = webPages.find(
    (page) => page?.title?.toLowerCase() === dynamicUrl.toLowerCase(),
  );

  const elements = currentPage ? savedDesigns[currentPage.id] || [] : [];

  function renderElement(element) {
    return (
      <div key={element.id} style={{ marginBottom: "16px" }}>
        {element.type === "typography" && (
          <TypographyElement text={element.props?.text || ""} />
        )}

        {element.type === "image" && (
          <ImageElement
            src={element.props?.src || ""}
            alt={element.props?.alt || ""}
          />
        )}

        {element.type === "stack" && (
          <StackElement>
            {(element.children || []).map(renderElement)}
          </StackElement>
        )}
      </div>
    );
  }

  return (
    <div>
      {elements.length > 0 ? (
        elements.map(renderElement)
      ) : (
        <p>طراحی ذخیره‌شده‌ای برای این کامپوننت وجود ندارد.</p>
      )}
    </div>
  );
}

export default NewComponentsMain;
