import { List, ListItem, ListItemText, Stack } from "@mui/material";
import AppButton from "../../../ui/AppButton";
import { useState } from "react";
import {
  getDataLocalStorage,
  saveDataLocalStorage,
} from "../../../hooks/useLocalStorage";
import { WEB_PAGES } from "../constants/pages-list-const";
import DesignModal from "./PagesListModal";
import { useNavigate } from "react-router-dom";

function PagesListMain() {
  const [title, setTitle] = useState("");
  const [webPages, setWebPages] = useState(getDataLocalStorage(WEB_PAGES));
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(webPages);
  const handleAddPage = () => {
    const newPage = { id: new Date().getTime(), title };
    const updatedPages = [...webPages, newPage];

    setWebPages(updatedPages);
    saveDataLocalStorage(WEB_PAGES, updatedPages);

    setIsOpen(false);
    setTitle("");
  };
  console.log(webPages);

  return (
    <Stack sx={{ paddingY: "20px" }} spacing={3}>
      <AppButton sx={{ width: "150px" }} handler={() => setIsOpen(true)}>
        اضافه کردن صفحه
      </AppButton>
      {isOpen && (
        <DesignModal
          title={title}
          setTitle={setTitle}
          handleAddPage={handleAddPage}
          open={isOpen}
          isClose={() => setIsOpen(false)}
        />
      )}
      {webPages.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {webPages.map((item) => (
            <ListItem
              sx={{ marginBottom: "10px" }}
              key={item.id}
              secondaryAction={
                <AppButton handler={() => navigate("/designer-page")}>
                  طراحی
                </AppButton>
              }
            >
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      )}
    </Stack>
  );
}

export default PagesListMain;
