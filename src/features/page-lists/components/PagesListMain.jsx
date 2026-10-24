import { List, ListItem, ListItemText, Stack } from "@mui/material";
import AppButton from "../../../ui/AppButton";
import { useState } from "react";
import DesignModal from "./PagesListModal";
import { useNavigate } from "react-router-dom";
import { useManageMenu } from "../../../context/mangeMenu/useManageMenu";
import { WEB_PAGES } from "../../../constants/constants";
import { createPage } from "../../../../server/pages";

function PagesListMain() {
  const [title, setTitle] = useState("");

  const { webPages, saveWebPageLocalStorage } = useManageMenu();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddPage = async () => {
    if (!title.trim()) return;

    const newPage = {
      id: String(Date.now()),
      title: title.trim(),
      elements: [],
      status: "draft",
      isActive: false,
      link: title,
    };

    try {
      await createPage(newPage);

      const menuPage = {
        id: newPage.id,
        title: newPage.title,
        isActive: newPage.isActive,
        type: WEB_PAGES,
        link: newPage.link,
      };

      const updatedPages = [...webPages, menuPage];
      saveWebPageLocalStorage(updatedPages);

      setIsOpen(false);
      setTitle("");
    } catch (error) {
      console.error("Failed to create page:", error);
      alert("ساخت صفحه ناموفق بود. لطفاً دوباره تلاش کنید.");
    }
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
