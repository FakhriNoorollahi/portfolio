import { List, ListItem, ListItemText, Stack } from "@mui/material";
import AppButton from "../../../ui/AppButton";
import { useState } from "react";
import DesignModal from "./PagesListModal";
import { useNavigate } from "react-router-dom";
import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";

function PagesListMain() {
  const [title, setTitle] = useState("");

  const { webPages, saveWebPageLocalStorage, saveMenuesItemLocalStorage } =
    useManageMenu();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddPage = () => {
    const newPage = { id: new Date().getTime(), title, isActive: false };
    const updatedPages = [...webPages, newPage];

    saveWebPageLocalStorage(updatedPages);
    saveMenuesItemLocalStorage(
      { ...newPage, link: `/${newPage.title.toLocaleLowerCase()}` },
      "Pages",
    );

    setIsOpen(false);
    setTitle("");
  };

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
                <AppButton
                  handler={() => navigate(`/designer-page/${item.id}`)}
                >
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
