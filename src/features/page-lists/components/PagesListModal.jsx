import { TextField } from "@mui/material";
import AppDialog from "../../../ui/AppDialog";

function PagesListModal({ isClose, open, title, setTitle, handleAddPage }) {
  return (
    <AppDialog
      open={open}
      handleClose={isClose}
      title="اضافه کردن صفحه"
      confirmText="اضافه کردن"
      handleConfirm={handleAddPage}
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ width: "100%" }}
        label="تایتل"
      />
    </AppDialog>
  );
}

export default PagesListModal;
