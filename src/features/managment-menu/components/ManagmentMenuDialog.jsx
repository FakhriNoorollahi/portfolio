import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import AppDialog from "../../../ui/AppDialog";
import { useState } from "react";
import { ADDRESSES, COMPONENTS, WEB_PAGES } from "../../../constants/constants";
import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";
import { updatePage } from "../../../../server/pages";

const TYPES = [COMPONENTS, WEB_PAGES, ADDRESSES];

function ManagmentMenuDialog({ open, handleClose }) {
  const {
    getMenus,
    saveWebPageLocalStorage,
    saveComponentsLocalStorage,
    saveAddressesLocalStorage,
  } = useManageMenu();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [link, setLink] = useState("");

  const subItems = getMenus(type) || [];

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setSelectedItem("");
    setName("");
    setIsActive(false);
    setLink("");
  };

  const handleItemChange = (e) => {
    const itemId = e.target.value;
    setSelectedItem(itemId);

    const current = subItems.find((item) => item.id === itemId);

    setName(current?.title ?? "");
    setLink(current?.link ?? "");
    setIsActive(current?.isActive ?? false);
  };

  // const handleDialogConfirm = () => {
  //   const newItems = subItems.map((item) => {
  //     return item.id === selectedItem
  //       ? {
  //           ...item,
  //           title: name,
  //           isActive,
  //           link,
  //         }
  //       : item;
  //   });

  //   if (type === COMPONENTS) {
  //     saveComponentsLocalStorage(newItems);
  //   } else if (type === ADDRESSES) {
  //     saveAddressesLocalStorage(newItems);
  //   } else if (type === WEB_PAGES) {
  //     saveWebPageLocalStorage(newItems);
  //   }
  //   handleClose();
  // };

  const handleDialogConfirm = async () => {
    const selected = subItems.find(
      (item) => String(item.id) === String(selectedItem),
    );

    if (!selected) return;

    const updatedItem = {
      ...selected,
      title: name,
      isActive,
      link,
    };

    try {
      if (type === WEB_PAGES) {
        await updatePage(selected.id, {
          title: name,
          isActive: isActive ? 1 : 0,
          link,
        });
      }

      const newItems = subItems.map((item) =>
        String(item.id) === String(selectedItem) ? updatedItem : item,
      );

      if (type === COMPONENTS) {
        saveComponentsLocalStorage(newItems);
      } else if (type === ADDRESSES) {
        saveAddressesLocalStorage(newItems);
      } else if (type === WEB_PAGES) {
        saveWebPageLocalStorage(newItems);
      }

      handleClose();
    } catch (error) {
      console.error("خطا در ذخیره تنظیمات منو:", error);
    }
  };

  return (
    <AppDialog
      open={open}
      title="Update Menu"
      confirmText="Save"
      handleClose={handleClose}
      handleConfirm={handleDialogConfirm}
    >
      <Stack>
        <TextField
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type-label">Select type</InputLabel>

          <Select
            labelId="type-label"
            value={type}
            label="Select type"
            onChange={handleTypeChange}
          >
            {TYPES.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="item-label">Select menu item</InputLabel>

          <Select
            labelId="item-label"
            value={selectedItem}
            label="Select menu item"
            onChange={handleItemChange}
          >
            {subItems.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            }
            label="isActive"
          />
        </FormGroup>
        <TextField
          label="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </Stack>
    </AppDialog>
  );
}

export default ManagmentMenuDialog;
