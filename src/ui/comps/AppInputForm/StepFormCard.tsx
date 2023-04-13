/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { AppType, Application } from '@prisma/client';
import AppInfo from './FormFields/AppInfo';

type Props = {
    appType: AppType;
    // eslint-disable-next-line no-unused-vars
    callback: (inpApp: Application) => void;
}

function StepFormCard({ appType, callback }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [app, setApp] = useState<Application>();

  const [pageState, setPageState] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  const submit = () => {
    if (typeof app !== 'undefined') {
        callback(app);
    } else {
        console.log('SUBMIT FAILED');
    }
  };

  const updateAppInfo = (appInfo: Application | null) => {
    if (appInfo != null) {
      setApp(appInfo);
    } else {
      setApp(undefined);
    }
  };

  const backPage = () => setPageState(pageState - 1);
  const nextPage = () => setPageState(pageState + 1);

  // handle buttonState
  useEffect(() => {
    switch (pageState) {
      // app input fields page
      case 0: {
        if (typeof app !== 'undefined' && !buttonState) {
          setButtonState(!buttonState);
        } else if (typeof app === 'undefined' && buttonState) {
          setButtonState(!buttonState);
        }
        break;
      }
      default: {
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, app]);

  return (
    <form id="assignmentInputForm" style={{ display: 'flex' }}>
      <div id="currentFormField" style={{ width: 400, margin: 'auto' }}>
        {
          // switch-like rendering based on pageState
          {
            0: (
              <>
                <Typography>{`Insert ${appType} Application Information:`}</Typography>
                <AppInfo app={app} appType={appType} updateAppInfoCallback={updateAppInfo} />
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