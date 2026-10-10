import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AppButton from "./AppButton";

function AppDialog({
  open,
  handleClose,
  children,
  title,
  handleConfirm,
  confirmText,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        paper: {
          sx: {
            width: "70%",
            overflow: "visible",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <AppButton handler={handleConfirm}>{confirmText}</AppButton>
        <AppButton handler={handleClose} autoFocus>
          انصراف
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}

export default AppDialog;
