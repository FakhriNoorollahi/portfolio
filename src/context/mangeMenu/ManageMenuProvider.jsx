import { useEffect, useState } from "react";
import { MENUS, WEB_PAGES } from "../../constants/constants";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../hooks/useLocalStorage";
import { ManageMenuContext } from "./ManageMenuContext";

const componentsSubItems = [
  { id: 123456789, title: "خانه", isActive: true, link: "/" },
  { id: 125021475, title: "محصولات", isActive: true, link: "/products" },
  { id: 120120123, title: "طراحی صفحه ", isActive: true, link: "/pages-list" },
];

const menusItems = ["Components", "Pages", "Addresses"].map((item) => {
  return {
    id: parseInt(new Date() * Math.random()),
    subItems: item === "Components" ? componentsSubItems : [],
    title: item,
  };
});

function ManageMenuProvider({ children }) {
  const [webPages, setWebPages] = useState(getDataLocalStorage(WEB_PAGES));
  const [menus, setMenus] = useState(() => {
    const localData = getDataLocalStorage(MENUS);
    return localData && localData.length > 0 ? localData : menusItems;
  });

  useEffect(() => {
    saveDataLocalStorage(WEB_PAGES, webPages);
  }, [webPages]);

  useEffect(() => {
    saveDataLocalStorage(MENUS, menus);
  }, [menus]);

  const saveWebPageLocalStorage = (updatedPages) => {
    setWebPages(updatedPages);
  };

  const saveMenuesItemLocalStorage = (newItem, label) => {
    const newMenus = menus.map((m) => {
      if (m.title === label) {
        const subItemsM = m.subItems;

        return {
          ...m,
          subItems: [...subItemsM, newItem],
        };
      } else {
        return m;
      }
    });
    setMenus(newMenus);
  };

  return (
    <ManageMenuContext.Provider
      value={{
        saveWebPageLocalStorage,
        webPages,
        menus,
        setMenus,
        saveMenuesItemLocalStorage,
      }}
    >
      {children}
    </ManageMenuContext.Provider>
  );
}

export default ManageMenuProvider;
