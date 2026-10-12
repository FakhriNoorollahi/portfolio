import List from "@mui/material/List";
import ManagmentMenuItem from "./ManagmentMenuItem";
import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";

function ManagmentMenuMain() {
  const { webPages: elements, saveWebPageLocalStorage } = useManageMenu();

  const onHandleAdd = (value) => {
    const { id, selectValue, url } = value;

    const updatedPages = elements.map((el) =>
      el.id === id ? { ...el, type: selectValue, url } : el,
    );

    saveWebPageLocalStorage(updatedPages);
  };

  return (
    <List>
      {elements.map((item) => (
        <ManagmentMenuItem
          key={item.id}
          item={item}
          onHandleAdd={onHandleAdd}
        />
      ))}
    </List>
  );
}

export default ManagmentMenuMain;
