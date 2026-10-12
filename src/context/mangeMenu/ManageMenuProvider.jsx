import { useEffect, useState } from "react";
import { WEB_PAGES } from "../../constants/constants";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../hooks/useLocalStorage";
import { ManageMenuContext } from "./ManageMenuContext";

function ManageMenuProvider({ children }) {
  const [webPages, setWebPages] = useState(getDataLocalStorage(WEB_PAGES));

  useEffect(() => {
    saveDataLocalStorage(WEB_PAGES, webPages);
  }, [webPages]);

  const saveWebPageLocalStorage = (updatedPages) => {
    setWebPages(updatedPages);
  };
  return (
    <ManageMenuContext.Provider value={{ saveWebPageLocalStorage, webPages }}>
      {children}
    </ManageMenuContext.Provider>
  );
}

export default ManageMenuProvider;
