import { useState } from 'react';
import { Theme, Tooltip } from '@mui/material';
import CustomDialog from '../CustomDialog';
import { StyledButton } from './popupButton.styles';
import AppInputForm from '../AppInputForm';
import { AppType, Application } from '@prisma/client';

type Props = {
  appType: AppType;
  // eslint-disable-next-line no-unused-vars
  callback: (value: Application) => void,
}

export default function PopupButton({ appType, callback }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleOpen = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (app: Application) => {
    console.log('submitted app');
    callback(app);
    handleClose();
  };

  return (
    <>
      <Tooltip title={`Register a new ${appType} into the system.`}>
        <StyledButton
          size="large"
          aria-label="map toggle"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          sx={{
            bgcolor: (theme:Theme) => theme.palette.primary.main
          }}
        >
          Register {appType}
        </StyledButton>
      </Tooltip>
      <CustomDialog open={open} onClose={handleClose} title="Insert Application Information">
        <AppInputForm appType={appType} callback={handleSubmit} />
      </CustomDialog>
    </>
  );
}