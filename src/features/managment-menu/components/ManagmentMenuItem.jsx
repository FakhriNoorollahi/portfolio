import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ListItem from "@mui/material/ListItem";

const MENU_ITEMS = [
  { id: 1, title: "component" },
  { id: 2, title: "page" },
];

function ManagmentMenuItem({ item, onHandleAdd }) {
  const [selectValue, setSelectValue] = useState(item.type || "");
  const [url, setUrl] = useState(item.url || "");

  const onHandleButton = () => {
    const value = { id: item.id, selectValue, url };
    onHandleAdd(value);
  };

  return (
    <ListItem>
      <Typography variant="p">{item.title}</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select</InputLabel>
        <Select
          value={selectValue}
          label="Select"
          onChange={(e) => setSelectValue(e.target.value)}
        >
          {MENU_ITEMS.map((itemMenu) => (
            <MenuItem key={itemMenu.id} value={itemMenu.title}>
              {itemMenu.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectValue === "page" && (
        <TextField
          label="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      )}

      <Button color="primary" onClick={onHandleButton}>
        Add
      </Button>
    </ListItem>
  );
}

export default ManagmentMenuItem;
