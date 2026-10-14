import { useEffect, useState } from "react";
import {
  ADDRESSES,
  COMPONENTS,
  MENUS,
  WEB_PAGES,
} from "../../constants/constants";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../hooks/useLocalStorage";
import { ManageMenuContext } from "./ManageMenuContext";

const componentsItems = [
  {
    id: 123456789,
    type: COMPONENTS,
    title: "خانه",
    isActive: true,
    link: "",
  },
  {
    id: 125021475,
    type: COMPONENTS,
    title: "محصولات",
    isActive: true,
    link: "products",
  },
  {
    id: 120120123,
    type: COMPONENTS,
    title: "طراحی صفحه ",
    isActive: true,
    link: "pages-list",
  },
  {
    id: 125242586,
    type: COMPONENTS,
    title: "مدیریت منو",
    isActive: true,
    link: "managment-menu",
  },
];

const addressesItems = [
  {
    id: 12341542789,
    type: ADDRESSES,
    title: "google",
    isActive: true,
    link: "google.com",
  },
  {
    id: 12012361475,
    type: ADDRESSES,
    title: "figma",
    isActive: true,
    link: "figma.com",
  },
];

const menuItems = [
  { id: 4512570123, type: COMPONENTS, childrenIds: [] },
  { id: 7488521408, type: WEB_PAGES, childrenIds: [] },
  { id: 9582012412, type: ADDRESSES, childrenIds: [] },
];

function ManageMenuProvider({ children }) {
  const [menus, setMenus] = useState(getDataLocalStorage(MENUS));
  const [webPages, setWebPages] = useState(
    getDataLocalStorage(WEB_PAGES).length ? getDataLocalStorage(WEB_PAGES) : [],
  );
  const [components, setComponents] = useState(
    getDataLocalStorage(COMPONENTS).length
      ? getDataLocalStorage(COMPONENTS)
      : componentsItems,
  );
  const [addresses, setAddresses] = useState(
    getDataLocalStorage(ADDRESSES).length
      ? getDataLocalStorage(ADDRESSES)
      : addressesItems,
  );

  useEffect(() => {
    if (!getDataLocalStorage(COMPONENTS).length) {
      saveDataLocalStorage(COMPONENTS, componentsItems);
    }
    if (!getDataLocalStorage(ADDRESSES).length) {
      saveDataLocalStorage(ADDRESSES, addressesItems);
    }
    if (!getDataLocalStorage(MENUS).length) {
      const newMenuItems = menuItems.map((item) => {
        if (item.type === COMPONENTS) {
          return {
            ...item,
            childrenIds: componentsItems.map((item) => item.id),
          };
        }
        if (item.type === ADDRESSES) {
          return {
            ...item,
            childrenIds: addressesItems.map((item) => item.id),
          };
        }
        if (item.type === WEB_PAGES) {
          return {
            ...item,
            childrenIds: webPages.map((item) => item.id),
          };
        }
      });
      saveDataLocalStorage(MENUS, newMenuItems);
    }
  }, []);

  useEffect(() => {
    saveDataLocalStorage(WEB_PAGES, webPages);
  }, [webPages]);

  useEffect(() => {
    saveDataLocalStorage(COMPONENTS, components);
  }, [components]);

  useEffect(() => {
    saveDataLocalStorage(ADDRESSES, addresses);
  }, [addresses]);

  const saveWebPageLocalStorage = (updatedPages) => {
    const ids = updatedPages.map((item) => item.id);
    setWebPages(updatedPages);
    const newMenus = menus.map((item) => {
      return item.title === WEB_PAGES ? { ...item, childrenIds: ids } : item;
    });
    setMenus(newMenus);
  };

  const saveComponentsLocalStorage = (updatedComponents) => {
    setComponents(updatedComponents);
  };

  const saveAddressesLocalStorage = (updatedAddresses) => {
    setAddresses(updatedAddresses);
  };

  const getMenus = (type) => {
    if (type === COMPONENTS) {
      return components;
    } else if (type === WEB_PAGES) {
      return webPages;
    } else if (type === ADDRESSES) {
      return addresses;
    }
  };

  return (
    <ManageMenuContext.Provider
      value={{
        webPages,
        components,
        addresses,
        menus,
        getMenus,
        saveWebPageLocalStorage,
        saveComponentsLocalStorage,
        saveAddressesLocalStorage,
      }}
    >
      {children}
    </ManageMenuContext.Provider>
  );
}

export default ManageMenuProvider;
