import { Typography, Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { Approved, Denied, StyledBox } from './regularUserDashboard.styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppType, Application } from '@prisma/client';
import AppPopupButton from '../AppPopupButton';
import { addNewApp, deleteApp } from '../../../endpoints/application';

type Props = {
    userApplications: Application [];
}

function RegularUserDashboard({ userApplications }: Props) {
    const [currentUserApps, setCurrentUserApps] = useState<Application []>(userApplications);
    const { data: session } = useSession();
    const router = useRouter();
    

  const submitNewApp = async (inpApp: Application) => {
    if (session && typeof session.user !== 'undefined') {
        inpApp.userId = session.user.id;
        let retApp = await addNewApp(inpApp) as Application;
        let newCurrentUserApps = [...currentUserApps];
        newCurrentUserApps.push(retApp);
        setCurrentUserApps(newCurrentUserApps);    
    }
  };

  const handleDeleteApp = async (appId: string) => {
    const deletedApp = await deleteApp(appId) as Application;
    // update the local applications state
    var newApplications = currentUserApps.filter((app) => app.id !== deletedApp.id);
    setCurrentUserApps(newApplications);
    console.log('APPLICATIONS', currentUserApps)
}

    if (session && typeof session.user !== 'undefined') {
        return (
            <StyledBox>
                <Typography>Welcome to the Regular Dashboard page!</Typography>
                <Typography>Signed in as {session.user.email}</Typography>
                <Button onClick={() => signOut()}>Sign Out</Button>
                <AppPopupButton appType={AppType.KID} callback={submitNewApp} />
                <AppPopupButton appType={AppType.MENTOR} callback={submitNewApp} />
                {
                        currentUserApps.length > 0 && (
                            <StyledBox>
                                {`Applications:`}
                                <ul>
                                    {
                                        currentUserApps.map((app) => {
                                            if (app.isApproved) {
                                                return (
                                                    <Approved>
                                                        <li key={app.id}>
                                                            {`   `}
                                                            {app.appType}
                                                            {`   `}
                                                            {app.title}
                                                            {`   `}
                                                            {app.appType === AppType.KID ? app.kidName : ''}
                                                            {`   Approved   `}
                                                            <Button onClick={() => handleDeleteApp(app.id)}>{`Delete App`}</Button>
                                                        </li>
                                                    </Approved>
                                                );
                                            } else {
                                                // current app is not currently approved
                                                return (
                                                    <Denied>
                                                        <li key={app.id}>
                                                            {`   `}
                                                            {app.appType}
                                                            {`   `}
                                                            {app.title}
                                                            {`   `}
                                                            {app.appType === AppType.KID ? app.kidName : ''}
                                                            {`   `}
                                                            <Button onClick={() => handleDeleteApp(app.id)}>{`Delete App`}</Button>
                                                        </li>
                                                    </Denied>
                                                );
                                            }

                                        })
                                    }
                                </ul>
                            </StyledBox>
                        )
                    }
            </StyledBox>
        );
    } else {
        // not logged in
        return (
            <>
            {router.push(`/`)}
            </>
          )
    }

}

export default RegularUserDashboard;

