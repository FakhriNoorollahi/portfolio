import { TableCell, TableRow } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function ManagmentMenuItem({ item }) {
  return (
    <TableRow
      key={item.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {item.title}
      </TableCell>

      <TableCell component="th" scope="row">
        {item.type}
      </TableCell>
      <TableCell component="th" scope="row">
        {item.isActive ? (
          <CheckIcon color="success" />
        ) : (
          <ClearIcon color="error" />
        )}
      </TableCell>
    </TableRow>
  );
}

export default ManagmentMenuItem;
