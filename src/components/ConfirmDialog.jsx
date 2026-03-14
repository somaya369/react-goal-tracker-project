import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useT } from "../i18n/i18n";

export default function ConfirmDialog({ open, title, description, onCancel, onConfirm }) {
  const t = useT();
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent><Typography>{description}</Typography></DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{t("cancel")}</Button>
        <Button variant="contained" onClick={onConfirm}>{t("confirm")}</Button>
      </DialogActions>
    </Dialog>
  );
}
