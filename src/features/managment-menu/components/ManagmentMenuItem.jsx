import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import AppButtonIcon from "../../../ui/AppButtonIcon";

function ManagmentMenuItem({ item, handleActiveClick }) {
  const [selectValue, setSelectValue] = useState(item?.subItems?.[0]?.id ?? "");
  const activeElm = item?.subItems?.find((i) => +i.id === +selectValue);
  const isActiveButton = activeElm?.isActive ?? false;

  const onActiveButton = () => {
    handleActiveClick(item, selectValue);
  };

  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {item.title}
      </TableCell>

      <TableCell component="th" scope="row">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Select</InputLabel>
          <Select
            value={selectValue}
            label="Select"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            {item?.subItems?.map((itemMenu) => (
              <MenuItem key={itemMenu.id} value={itemMenu.id}>
                {itemMenu.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell component="th" scope="row">
        <AppButtonIcon disabled={isActiveButton} handler={onActiveButton}>
          +
        </AppButtonIcon>
        <AppButtonIcon disabled={!isActiveButton} handler={onActiveButton}>
          -
        </AppButtonIcon>
      </TableCell>
    </TableRow>
  );
}

export default ManagmentMenuItem;
