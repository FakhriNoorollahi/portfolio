import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ManagmentMenuItem from "./ManagmentMenuItem";

const tableHeaders = [
  { id: 1, title: "Type" },
  { id: 2, title: "title" },
  { id: 4, title: "Active/Deactive" },
];

function ManagmentMenuMain() {
  const { menus, setMenus } = useManageMenu();

  const handleActiveClick = (type, value) => {
    const updatedMenus = menus.map((m) =>
      m.title === type.title
        ? {
            ...m,
            subItems: m.subItems.map((ms) =>
              ms.id === value ? { ...ms, isActive: !ms.isActive } : ms,
            ),
          }
        : m,
    );
    setMenus(updatedMenus);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((p) => (
              <TableCell key={p.id}>{p.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((cItem) => (
            <ManagmentMenuItem
              item={cItem}
              key={cItem.id}
              handleActiveClick={handleActiveClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManagmentMenuMain;
