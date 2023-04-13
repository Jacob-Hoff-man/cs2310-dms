/* global HTMLInputElement */
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { AppType, Application } from '@prisma/client';

type Props = {
    app: Application | null | undefined,
    appType: AppType,
    // eslint-disable-next-line no-unused-vars
    updateAppInfoCallback: (app: Application | null) => void
}

function AppInfo({ app, appType, updateAppInfoCallback }: Props) {
  const [appTitle, setAppTitle] = useState(app ? app.title : '');
  const [appContent, setAppContent] = useState(app ? app.content : '');
  const [appKidName, setAppKidName] = useState(app ? app.kidName : '');

  const updateAppInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    // update state
    if (e.target.id === 'appTitle') {
      setAppTitle(e.target.value);
    } else if (e.target.id === 'appContent') {
      setAppContent(e.target.value);
    } else if (e.target.id === 'appKidName') {
      setAppKidName(e.target.value);
    }
  };

  // handle app info validation and callback to send App to parent component
  useEffect(() => {
    let retApp: Application = {
        title: appTitle,
        content: appContent,
        id: '',
        published: false,
        userId: null,
        appType: appType,
        isApproved: false,
        kidName: appKidName
    };
    
    updateAppInfoCallback(retApp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appTitle, appContent, appKidName]);
  
  if (appType === AppType.KID) {
    return (
      <div>
        <Typography>insert app title:</Typography>
        <input type="text" id="appTitle" onChange={updateAppInfo} defaultValue={app ? app.title : ''} />
        <Typography>insert app content:</Typography>
        <input type="text" id="appContent" onChange={updateAppInfo} defaultValue={app ? app.content ? app.content : '' : ''} />
        <Typography>insert kid name:</Typography>
        <input type="text" id="appKidName" onChange={updateAppInfo} defaultValue={app ? app.kidName ? app.kidName : '' : ''} />
      </div>
    );
  }

  return (
    <div>
      <Typography>insert app title:</Typography>
      <input type="text" id="appTitle" onChange={updateAppInfo} defaultValue={app ? app.title : ''} />
      <Typography>insert app content:</Typography>
      <input type="text" id="appContent" onChange={updateAppInfo} defaultValue={app ? app.content ? app.content : '' : ''} />
    </div>
  );
}

export default AppInfo;