import { Typography, Button } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { Approved, Denied, StyledBox, StyledButtonsBox, StyledUnorderedList } from './regularUserDashboard.styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppType, Application, Appointment, Kid, Mentor } from '@prisma/client';
import AppPopupButton from '../AppPopupButton';
import { addNewApp, deleteApp } from '../../../endpoints/application';
import { deleteKidByAppId } from '../../../endpoints/kid';
import { deleteMentorByAppId } from '../../../endpoints/mentor';
import ApptPopupButton from '../ApptPopupButton';
import { addNewAppt, deleteAppt, updateApptMentor } from '../../../endpoints/appointment';

type Props = {
    userApplications: Application [];
    userUnscheduledAppointments: Appointment [];
    userKids: Kid [];
    apptKids: Kid [];
    userMentor: Mentor | undefined;
    userMentorAppExists: boolean;
    userIsMentor: boolean;
    unscheduledAppointments: Appointment [];
    userScheduledAppointments: Appointment [];
    scheduledApptsMentors: Mentor [];
}

function RegularUserDashboard({
    userApplications,
    userKids,
    apptKids,
    userMentor,
    userUnscheduledAppointments,
    userMentorAppExists,
    userIsMentor,
    unscheduledAppointments,
    userScheduledAppointments,
    scheduledApptsMentors
}: Props) {
    // state vars
    const [currentUserApps, setCurrentUserApps] = useState<Application []>(userApplications);
    const [currentUserKids, setCurrentUserKids] = useState<Kid []>(userKids);
    const [currentApptKids, setCurrentApptKids] = useState<Kid []>(apptKids);
    const [currentUserMentor, setCurrentUserMentor] = useState<Mentor | undefined>(userMentor);
    const [currentUserMentorAppExists, setCurrentUserMentorAppExists] = useState(userMentorAppExists);
    const [currentUserIsMentor, setCurrentUserIsMentor] = useState(userIsMentor);
    const [currentUserUnscheduledAppts, setCurrentUserUnscheduledAppts] = useState(userUnscheduledAppointments);
    const [currentUnscheduledAppts, setCurrentUnscheduledAppts] = useState(unscheduledAppointments);
    const [currentUserScheduledAppts, setCurrentUserScheduledAppts] = useState(userScheduledAppointments);
    const [currentScheduledApptsMentors, setCurrentScheduledApptsMentors] = useState(scheduledApptsMentors);
    const { data: session } = useSession();
    const router = useRouter();
    // handler fcns
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
            let newUserKids = currentUserKids.filter((kid) => kid.id !== deletedKid.id);
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

    const submitNewAppt = async (inpAppt: Appointment) => {
        if (session && typeof session.user !== 'undefined') {
            let retAppt = await addNewAppt(inpAppt) as Appointment;
            let newCurrentUserUnscheduledAppts = [...currentUserUnscheduledAppts];
            newCurrentUserUnscheduledAppts.push(retAppt);
            setCurrentUserUnscheduledAppts(newCurrentUserUnscheduledAppts);
        }
    };

    const handleDeleteUserUnscheduledAppt = async (apptId: string) => {
        const deletedAppt = await deleteAppt(apptId) as Appointment;
        // update the local userAppts state
        let newUnscheduledAppts = currentUserUnscheduledAppts.filter((appt) => appt.id !== deletedAppt.id);
        setCurrentUserUnscheduledAppts(newUnscheduledAppts);
        console.log('UNSCHEDULED APPTS',currentUserUnscheduledAppts)
    };

    const handleUpdateUnscheduledAppt = async (apptId: string) => {
        console.log(apptId);
        const body = {
            apptId,
            mentorId: (currentUserMentor as Mentor).id
        }
        const updatedAppt = await updateApptMentor(body) as Appointment;
        // update the local unscheduled appointments state
        let newAppts = currentUnscheduledAppts.filter((appt) => appt.id != updatedAppt.id);
        setCurrentUnscheduledAppts(newAppts);
        console.log('UNSCHEDULED APPOINTMENTS', currentUserUnscheduledAppts)
        // update the local scheduled appointments state for the current user
        let newScheduledAppts = [...currentUserScheduledAppts];
        newScheduledAppts.push(updatedAppt);
        setCurrentUserScheduledAppts(newScheduledAppts);
        console.log('SCHEDULED APPOINTMENTS', currentUserScheduledAppts);
    };
    // conditional rendering based on successful user authentication
    if (session && typeof session.user !== 'undefined') {
        return (
            <StyledBox>
                { /* User/Dashboard info */ }
                <StyledBox>
                    <Typography variant='h6'>Welcome to the Regular Dashboard page!</Typography>
                    <Typography>Signed in as {session.user.email}</Typography>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </StyledBox>
                { /* Scheduled User Appointments (Any Perspective) */
                    currentUserScheduledAppts.length > 0 && (
                        <StyledBox>
                            <Typography variant='h6'>
                                {`Scheduled Appointments:`}
                            </Typography>
                            <StyledUnorderedList>
                            {
                                currentUserScheduledAppts.map((appt) => {
                                    let userKidsIds = currentUserKids.map((kid) => kid.id);
                                    let kid = appt.kidId !== null &&
                                        userKidsIds.includes(appt.kidId) ? 
                                        currentUserKids.find((kid) => kid.id === appt.kidId) : 
                                        currentApptKids.find((kid) => kid.id === appt.kidId);
                                    let mentor = currentScheduledApptsMentors.find((mentor) => mentor.id === appt.mentorId);
                                    return (
                                        <li key={appt.id}>
                                            {`   `}
                                            {(mentor as Mentor).mentorName}
                                            {`   `}
                                            {(kid as Kid).kidName}
                                            {`   `}
                                            {`${appt.startTime}`}
                                        </li>
                                    );
                                })
                            }
                        </StyledUnorderedList>
                        </StyledBox>
                    )
                }
                { /* Unscheduled Appointments (Mentor Perspective) */
                    currentUserIsMentor && currentUnscheduledAppts.length > 0 && (
                        <StyledBox>
                            <Typography variant='h6'>
                                {`Unscheduled Appointments (Mentor):`}
                            </Typography>
                            <StyledUnorderedList>
                            {
                                currentUnscheduledAppts.map((appt) => {
                                    let kid = apptKids.find((kid) => kid.id === appt.kidId);
                                    return (
                                        <li key={appt.id}>
                                            {`   `}
                                            {(kid as Kid).kidName}
                                            {`   `}
                                            {`${appt.startTime}`}
                                            {`   `}
                                            <Button onClick={() => handleUpdateUnscheduledAppt(appt.id)}>{`Accept Appt`}</Button>
                                        </li>
                                    );
                                })
                            }
                        </StyledUnorderedList>
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
                            {
                                userKids.map((kid) => (
                                    <ApptPopupButton callback={submitNewAppt} apptKid={kid} />
                                ))
                            }
                        </StyledButtonsBox>
                        <StyledUnorderedList>
                            {
                                currentUserUnscheduledAppts.map((appt) => {
                                    let userKid = userKids.find((kid) => kid.id === appt.kidId);
                                    return (
                                        <li key={appt.id}>
                                            {`   `}
                                            {(userKid as Kid).kidName}
                                            {`   `}
                                            {`${appt.startTime}`}
                                            {`   `}
                                            <Button onClick={() => handleDeleteUserUnscheduledAppt(appt.id)}>{`Delete Appt`}</Button>
                                        </li>
                                    );
                                })
                            }
                        </StyledUnorderedList>
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

