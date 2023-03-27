import { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type DialogTitleProps = {
  children?: ReactNode;
  onClose: () => void;
}

type DialogProps = {
  open: boolean,
  onClose: () => void,
  children?: ReactNode,
  title: string
}

function CustomDialogTitle({ children, onClose }: DialogTitleProps) {
  return (
    <DialogTitle>
      {children}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
}

export default function CustomDialog({
  open, onClose, children, title
}: DialogProps) {
  return (
    <Dialog
      onClose={onClose}
      open={open}
    >
      <CustomDialogTitle onClose={onClose}>
        {title}
      </CustomDialogTitle>
      {children}
    </Dialog>
  );
}
