/* global HTMLInputElement */
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Appointment } from '@prisma/client';
import { Autocomplete, Box, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { addHours } from '../../../../helpers/date';


const hoursOptions = [
  { label: "1", number: 1.0},
  { label: "1.5", number: 1.5},
  { label: "2", number: 2.0},
  { label: "2.5", number: 2.5},
  { label: "3", number: 3.0},
  { label: "3.5", number: 3.5},
  { label: "4", number: 4.0},
  { label: "4.5", number: 4.5},
  { label: "5", number: 5.0},
  { label: "5.5", number: 5.5},
  { label: "6", number: 6.0},
  { label: "6.5", number: 6.5},
  { label: "7", number: 7.0},
  { label: "7.5", number: 7.5},
  { label: "8", number: 8.0},
]

type Props = {
    appt: Appointment | null | undefined,
    // eslint-disable-next-line no-unused-vars
    updateApptInfoCallback: (app: Appointment | null) => void
}

function ApptInfo({ appt, updateApptInfoCallback }: Props) {
  const [apptStartTime, setApptStartTime] = useState(appt ? appt.startTime : null);
  const [apptEndTime, setApptEndTime] = useState(appt ? appt.endTime : undefined);
  const [apptTimeLengthHours, setApptTimeLengthHours] = useState<number | null>(null);

  // handle appt info validation and callback to send App to parent component
  useEffect(() => {
    let retApp: Appointment = {
      id: '',
      startTime: new Date(apptStartTime as Date),
      endTime: new Date(apptEndTime as Date),
      isScheduled: false,
      isActive: false,
      kidId: null,
      mentorId: null
    };
    
    updateApptInfoCallback(retApp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apptStartTime, apptEndTime]);
  
  // handle calculation of apptEndTime whenever apptStartTime and apptTimeLengthHours exist
  useEffect(() => {
    if (apptStartTime !== null && apptTimeLengthHours !== null) {
      console.log('GENERATING THE END DATE:\nappStartTime=',apptStartTime,'\napptTimeLengthHours=',apptTimeLengthHours);
      setApptEndTime(addHours(apptStartTime, apptTimeLengthHours));
      console.log(addHours(apptStartTime, apptTimeLengthHours));
    }
  }, [apptStartTime, apptTimeLengthHours]);

  return (
    <div>
      <Box>
        <Typography>How many hours?</Typography>
        <Autocomplete 
          disablePortal
          id="apptTimeLengthHours"
          options={hoursOptions}
          renderInput={(params) => <TextField {...params} label="time length" />}
          onChange={(event, newVal) => setApptTimeLengthHours(newVal === null ? null : newVal.number)}
        />
      </Box>
      <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                    label="Select Start Date"
                    value={apptStartTime}
                    onChange={(newVal) => {
                      if (newVal === null) setApptStartTime(null)
                      else {
                        console.log('AAAAAA',newVal);
                        setApptStartTime(newVal);
                      }
                    }}
                />
            </LocalizationProvider>
      </Box>
      {
        apptStartTime !== null && (
          <Typography>{`Debug Start Time: ${apptStartTime}`}</Typography>
        )
      }
      {
        apptEndTime !== null && (
          <Typography>{`Debug End Time: ${apptEndTime}`}</Typography>
        )
      }
    </div>
  );
}

export default ApptInfo;