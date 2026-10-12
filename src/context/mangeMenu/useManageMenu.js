import { useContext } from "react";
import { ManageMenuContext } from "./ManageMenuContext";

export function useManageMenu() {
  const context = useContext(ManageMenuContext);

  if (context === null || context === undefined) {
    throw new Error("useManageMenu must be used inside ManageMenuProvider");
  }

  return context;
}
