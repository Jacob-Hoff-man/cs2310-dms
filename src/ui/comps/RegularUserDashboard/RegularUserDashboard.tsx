import { Typography, Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { Approved, Denied, StyledBox, StyledButtonsBox, StyledUnorderedList } from './regularUserDashboard.styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppType, Application, Kid } from '@prisma/client';
import AppPopupButton from '../AppPopupButton';
import { addNewApp, deleteApp } from '../../../endpoints/application';
import { deleteKidByAppId } from '../../../endpoints/kid';
import { deleteMentorByAppId } from '../../../endpoints/mentor';

type Props = {
    userApplications: Application [];
    // unscheduledAppointments: Appointment [];
    userKids: Kid [];
    userMentorAppExists: boolean;
    userIsMentor: boolean;
}

function RegularUserDashboard({ userApplications, userKids, /* unscheduledAppointments, */ userMentorAppExists, userIsMentor }: Props) {
    const [currentUserApps, setCurrentUserApps] = useState<Application []>(userApplications);
    const [currentUserKids, setCurrentUserKids] = useState<Kid []>(userKids);
    const [currentUserMentorAppExists, setCurrentUserMentorAppExists] = useState(userMentorAppExists);
    const [currentUserIsMentor, setCurrentUserIsMentor] = useState(userIsMentor);

    const { data: session } = useSession();
    const router = useRouter();
    

    const submitNewApp = async (inpApp: Application) => {
        if (session && typeof session.user !== 'undefined') {
            inpApp.userId = session.user.id;
            let retApp = await addNewApp(inpApp) as Application;
            let newCurrentUserApps = [...currentUserApps];
            newCurrentUserApps.push(retApp);
            setCurrentUserApps(newCurrentUserApps);
            if (retApp.appType === AppType.MENTOR) setCurrentUserMentorAppExists(true);
        }
    };    

    const handleDeleteApp = async (appId: string, appType: AppType) => {
        if (appType === AppType.KID) {
            const deletedKid = await deleteKidByAppId(appId) as Kid;
            // update the local userKids state
            let newUserKids = currentUserKids.filter((kid) => kid.id !== deletedKid.id)
            setCurrentUserKids(newUserKids);
            console.log('KIDS', currentUserKids);
        } else if (appType === AppType.MENTOR) {
            const deletedMentor = await deleteMentorByAppId(appId);
            console.log('DELETED MENTOR', deletedMentor);
            setCurrentUserMentorAppExists(false);
            setCurrentUserIsMentor(false);
        }

        const deletedApp = await deleteApp(appId) as Application;
        // update the local applications state
        let newApplications = currentUserApps.filter((app) => app.id !== deletedApp.id);
        setCurrentUserApps(newApplications);
        console.log('APPLICATIONS', currentUserApps)
    };

    if (session && typeof session.user !== 'undefined') {
        return (
            <StyledBox>
                <Typography variant='h6'>Welcome to the Regular Dashboard page!</Typography>
                <Typography>Signed in as {session.user.email}</Typography>
                <Button onClick={() => signOut()}>Sign Out</Button>
                { /* Unscheduled Appointments (Mentor Perspective) */
                    currentUserIsMentor && (
                        <StyledBox>
                            <Typography variant='h6'>
                                {`Unscheduled Appointments (Mentor):`}
                            </Typography>
                        </StyledBox>
                    )
                }
                { /* User-Submitted Unscheduled Appointments (Kid Perspective) */
                    currentUserKids.length > 0 && (
                        <StyledBox>
                        <Typography variant='h6'>
                            {`Unscheduled Appointments (Kid):`}
                        </Typography>
                        <StyledButtonsBox>
                            
                        </StyledButtonsBox>
                    </StyledBox>
                    )
                }
                { /* User Applications */
                    currentUserApps.length > 0 ? (
                        <StyledBox>
                            <Typography variant='h6'>
                                {`Applications:`}
                            </Typography>
                            <StyledButtonsBox>
                                <AppPopupButton appType={AppType.KID} callback={submitNewApp} />
                                {
                                    !currentUserMentorAppExists && (
                                        <AppPopupButton appType={AppType.MENTOR} callback={submitNewApp} />
                                    )
                                }
                            </StyledButtonsBox>
                            <StyledUnorderedList>
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
                                                        <Button onClick={() => handleDeleteApp(app.id, app.appType)}>{`Delete App`}</Button>
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
                                                        <Button onClick={() => handleDeleteApp(app.id, app.appType)}>{`Delete App`}</Button>
                                                    </li>
                                                </Denied>
                                            );
                                        }

                                    })
                                }
                            </StyledUnorderedList>
                        </StyledBox>
                    ) : (
                        <StyledBox>
                            <Typography variant='h6'>
                                {`Submit an Application:`}
                            </Typography>
                            <StyledButtonsBox>
                                <AppPopupButton appType={AppType.KID} callback={submitNewApp} />
                                {
                                    !currentUserMentorAppExists && (
                                        <AppPopupButton appType={AppType.MENTOR} callback={submitNewApp} />
                                    )
                                }
                            </StyledButtonsBox>
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

