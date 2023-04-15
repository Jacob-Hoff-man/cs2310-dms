import { useState } from 'react';
import { Theme, Tooltip } from '@mui/material';
import CustomDialog from '../CustomDialog';
import { StyledButton } from './popupButton.styles';
import ApptInputForm from '../ApptInputForm';
import { Appointment, Kid } from '@prisma/client';

type Props = {
  // eslint-disable-next-line no-unused-vars
  callback: (value: Appointment) => void,
  apptKid: Kid
}

export default function PopupButton({ callback, apptKid }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleOpen = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleSubmit = (appt: Appointment) => {
    appt.kidId = apptKid.id;
    console.log('submitted app');
    callback(appt);
    handleClose();
  };

  return (
    <>
      <Tooltip title={`Submit a new UNSCHEDULED APPOINTMENT into the system for ${apptKid.kidName}.`}>
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
          REQUEST APPOINTMENT FOR {apptKid.kidName}
        </StyledButton>
      </Tooltip>
      <CustomDialog open={open} onClose={handleClose} title="Insert Application Information">
        <ApptInputForm callback={handleSubmit} />
      </CustomDialog>
    </>
  );
}