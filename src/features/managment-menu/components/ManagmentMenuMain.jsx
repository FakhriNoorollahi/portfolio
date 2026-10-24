import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AppButton from "../../../ui/AppButton";
import { useState } from "react";
import ManagmentMenuDialog from "./ManagmentMenuDialog";
import ManagmentMenuItem from "./ManagmentMenuItem";

const tableHeaders = [
  { id: 2, title: "title" },
  { id: 1, title: "Type" },
  { id: 3, title: "isActive" },
];

function ManagmentMenuMain() {
  const [isOpen, setIsOpen] = useState(false);
  const { webPages, components, addresses } = useManageMenu();

  const allItems = [...components, ...webPages, ...addresses];
  console.log(allItems);

  return (
    <Stack sx={{ marginY: "20px" }}>
      <AppButton
        sx={{ width: "200px", marginBottom: "20px" }}
        handler={() => setIsOpen(true)}
      >
        New Menu Item
      </AppButton>
      {isOpen && (
        <ManagmentMenuDialog
          open={isOpen}
          handleClose={() => setIsOpen(false)}
        />
      )}
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
            {allItems?.map((cItem) => (
              <ManagmentMenuItem item={cItem} key={cItem.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default ManagmentMenuMain;
