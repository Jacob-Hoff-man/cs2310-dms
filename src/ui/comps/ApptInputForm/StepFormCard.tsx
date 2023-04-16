/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { Appointment } from '@prisma/client';
import ApptInfo from './FormFields/ApptInfo';

type Props = {
    // eslint-disable-next-line no-unused-vars
    callback: (inpApp: Appointment) => void;
}

function StepFormCard({ callback }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [appt, setAppt] = useState<Appointment>();

  const [pageState, setPageState] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  const submit = () => {
    if (typeof appt !== 'undefined') {
        callback(appt);
    } else {
        console.log('SUBMIT FAILED');
    }
  };

  const updateApptInfo = (apptInfo: Appointment | null) => {
    if (apptInfo != null) {
      setAppt(apptInfo);
    } else {
      setAppt(undefined);
    }
  };

  const backPage = () => setPageState(pageState - 1);
  const nextPage = () => setPageState(pageState + 1);

  // handle buttonState
  useEffect(() => {
    switch (pageState) {
      // app input fields page
      case 0: {
        if (typeof appt !== 'undefined' && !buttonState) {
          setButtonState(!buttonState);
        } else if (typeof appt === 'undefined' && buttonState) {
          setButtonState(!buttonState);
        }
        break;
      }
      default: {
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, appt]);

  return (
    <form id="assignmentInputForm" style={{ display: 'flex' }}>
      <div id="currentFormField" style={{ width: 400, margin: 'auto' }}>
        {
          // switch-like rendering based on pageState
          {
            0: (
              <>
                <Typography>{`Insert Appointment Information:`}</Typography>
                <ApptInfo appt={appt} updateApptInfoCallback={updateApptInfo} />
              </>
            ),
          }[pageState]
        }
        {
          // back button
          pageState === 0 ? (
          // show disabled back button on first step
            <Button disabled>
              back
            </Button>
          ) : (
          // show back button on all steps but first
            <Button onClick={backPage}>
              back
            </Button>
          )
        }
        {
          // primary button - show submit button on pageState == 0
          pageState === 0 ? buttonState ? (
          // show submit button on final step
            <Button onClick={submit}>
              submit
            </Button>
          ) : (
          // show disabled submit button
            <Button type="button" disabled>
              submit
            </Button>
          ) : buttonState ? (
          // show next button on all steps but except final
            <Button type="button" onClick={nextPage}>
              next
            </Button>
          ) : (
          // show disabled next button
            <Button type="button" disabled>
              next
            </Button>
          )
        }
      </div>
    </form>
  );
}

export default StepFormCard;