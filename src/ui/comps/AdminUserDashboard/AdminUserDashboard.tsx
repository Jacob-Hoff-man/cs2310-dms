import { Active, Approved, Denied, StyledBox, StyledUnorderedList } from './adminUserDashboard.styles';
import { signOut, useSession } from 'next-auth/react';
import isAdmin from '../../../auth/admin';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Application, Appointment, AppType, Kid, Mentor } from '@prisma/client';
import { deleteApp, updateAppIsApproved } from '../../../endpoints/application';
import { useState } from 'react';
import { addNewKid, deleteKidByAppId } from '../../../endpoints/kid';
import { addNewMentor, deleteMentorByAppId } from '../../../endpoints/mentor';
import { deleteAppt, updateApptIsActive } from '../../../endpoints/appointment';

type Props = {
    applications: Application [];
    userEmails: Map<string, string>;
    scheduledAppts: Appointment [];
    scheduledApptsMentors: Mentor [];
    scheduledApptsKids: Kid [];
}

function AdminUserDashboard({
    applications,
    userEmails,
    scheduledAppts,
    scheduledApptsMentors,
    scheduledApptsKids
}: Props) {
    // state vars
    const [currentApps, setCurrentApps] = useState(applications);
    const [currentUserEmails, setCurrentUserEmails] = useState(userEmails);
    const [currentScheduledAppts, setCurrentScheduledAppts] = useState(scheduledAppts);
    const [currentScheduledApptsMentors, setCurrentScheduledApptsMentors] = useState(scheduledApptsMentors);
    const [currentScheduledApptsKids, setCurrentScheduledApptsKids] = useState(scheduledApptsKids);
    const { data: session } = useSession();
    const router = useRouter();
    // handler fcns
    const toggleAppIsApproved = async (appId: string, isApproved: boolean) => {
        const body = {
            appId,
            isApproved
        }
        const updatedApp = await updateAppIsApproved(body) as Application;
        // update the local applications state
        let newApplications = currentApps.filter((app) => app.id != updatedApp.id);
        newApplications.push(updatedApp);
        setCurrentApps(newApplications);
        console.log('APPLICATIONS', currentApps)
        if (isApproved) {
            // add new kid/mentor
            if (updatedApp.appType === AppType.KID) {
                const newKid: Kid = {
                    id: '',
                    kidName: updatedApp.kidName as string,
                    appId: updatedApp.id
                };
                const addedKid = await addNewKid(newKid);
                console.log("ADDED KID", addedKid);
    
            } else if (updatedApp.appType === AppType.MENTOR) {
                const newMentor: Mentor = {
                    id: '',
                    mentorName: userEmails.get(updatedApp.userId as string) ?? '',
                    appId: updatedApp.id
                };
                const addedMentor = await addNewMentor(newMentor);
                console.log("ADDED MENTOR", addedMentor);
            }
        } else {
            // delete kid/mentor by appId
            if (updatedApp.appType === AppType.KID) {
                const deletedKid = await deleteKidByAppId(updatedApp.id);
                console.log("DELETED KID",deletedKid);
            } else if (updatedApp.appType === AppType.MENTOR) {
                const deletedMentor = await deleteMentorByAppId(updatedApp.id);
                console.log("DELETED MENTOR",deletedMentor);
            }
        }

    };
    const handleDeleteApp = async (appId: string) => {
        const deletedApp = await deleteApp(appId) as Application;
        // update the local applications state
        let newApplications = currentApps.filter((app) => {
            let notDeletedApp = app.id !== deletedApp.id;
            if (notDeletedApp) return true;
            else {
                // update currentUserEmails
                const newUserEmails = currentUserEmails;
                if (app.userId !== null) newUserEmails.delete(app.userId);
                return false;
            }
        });
        setCurrentApps(newApplications);
        console.log('APPLICATIONS', currentApps)
        if (deletedApp.appType === AppType.KID) {
            const deletedKid = await deleteKidByAppId(deletedApp.id) as Kid;
            console.log('DELETED KID', deletedKid);
        } else if (deletedApp.appType === AppType.MENTOR) {
            const deletedMentor = await deleteMentorByAppId(deletedApp.id);
            console.log('DELETED MENTOR', deletedMentor);
        }
    }
    const handleDeleteScheduledAppt = async (apptId: string) => {
        const deletedAppt = await deleteAppt(apptId) as Appointment;
        // update the local scheduledAppts state
        let newScheduledAppts = currentScheduledAppts.filter((appt) => appt.id !== deletedAppt.id);
        setCurrentScheduledAppts(newScheduledAppts);
        console.log('SCHEDULED APPTS',currentScheduledAppts)
    };
    const toggleApptIsActive = async (apptId: string, isActive: boolean) => {
        const body = {
            apptId,
            isActive
        }
        const updatedAppt = await updateApptIsActive(body) as Appointment;
        // update the local scheduledAppts state
        let newScheduledAppts = currentScheduledAppts.filter((appt) => appt.id != updatedAppt.id);
        newScheduledAppts.push(updatedAppt);
        setCurrentScheduledAppts(newScheduledAppts);
    };
    // conditional rendering based on successful user authentication
    if (session && typeof session.user !== 'undefined') {
        if (isAdmin(session.user.email)) {
            return (
                <StyledBox>
                    { /* User/Dashboard info */ }
                    <StyledBox>
                        <Typography variant='h6'>Welcome to the Admin Dashboard page!</Typography>
                        <Typography>Signed in as {session.user.email}</Typography>
                        <Button onClick={() => signOut()}>Sign Out</Button>
                    </StyledBox>
                    {
                        /* all Scheduled Appointments */
                        currentScheduledAppts.length > 0 && (
                            <StyledBox>
                                <Typography variant='h6'>
                                    {`Scheduled Appointments:`}
                                </Typography>
                                <StyledUnorderedList>
                                {
                                    currentScheduledAppts.map((appt) => {
                                        let kid = currentScheduledApptsKids.find((kid) => kid.id === appt.kidId)
                                        let mentor = currentScheduledApptsMentors.find((mentor) => mentor.id === appt.mentorId);
                                        if (appt.isActive) {
                                            return (
                                                <Active>
                                                    <li key={appt.id}>
                                                        {`   `}
                                                        {(mentor as Mentor).mentorName}
                                                        {`   `}
                                                        {(kid as Kid).kidName}
                                                        {`   `}
                                                        {`${appt.startTime}`}
                                                        {`   `}
                                                        <Button 
                                                            onClick={() => toggleApptIsActive(appt.id, false)}
                                                        >
                                                            {`End`}
                                                        </Button>
                                                        {`   `}
                                                        <Button onClick={() => handleDeleteScheduledAppt(appt.id)}>{`Delete`}</Button>
                                                    </li>
                                                </Active>
                                            );
                                        }
                                        return (
                                            <li key={appt.id}>
                                                {`   `}
                                                {(mentor as Mentor).mentorName}
                                                {`   `}
                                                {(kid as Kid).kidName}
                                                {`   `}
                                                {`${appt.startTime}`}
                                                {`   `}
                                                <Button 
                                                    onClick={() => toggleApptIsActive(appt.id, true)}
                                                >
                                                    {`Start`}
                                                </Button>
                                                {`   `}
                                                <Button onClick={() => handleDeleteScheduledAppt(appt.id)}>{`Delete`}</Button>
                                            </li>
                                        );
                                    })
                                }
                            </StyledUnorderedList>
                            </StyledBox>
                        )
                    }
                    {   /* Mentor and Kid applications */
                        currentApps.length > 0 && (
                            <StyledBox>
                                <Typography variant='h6'>
                                    {`Applications:`}
                                </Typography>
                                <StyledUnorderedList>
                                    {
                                        currentApps.map((app) => {
                                            if (app.isApproved) {
                                                return (
                                                    <Approved>
                                                        <li key={app.id}>
                                                            {app.appType}
                                                            {`   `}
                                                            {app.title}
                                                            {`   `}
                                                            {app.userId !== null ? currentUserEmails.get(app.userId) : app.userId}
                                                            {`   `}
                                                            <Button onClick={() => toggleAppIsApproved(app.id, false)}>{`Deny App`}</Button>
                                                            {`   `}
                                                            <Button onClick={() => handleDeleteApp(app.id)}>{`Delete App`}</Button>
                                                            
                                                        </li>
                                                    </Approved>
                                                );
                                            } else {
                                                // current app is not currently approved
                                                return (
                                                    <Denied>
                                                        <li key={app.id}>
                                                        {app.appType}
                                                            {`   `}
                                                            {app.title}
                                                            {`   `}
                                                            {app.userId !== null ? currentUserEmails.get(app.userId) : app.userId}
                                                            {`   `}
                                                            <Button onClick={() => toggleAppIsApproved(app.id, true)}>{`Accept App`}</Button>
                                                            {`   `}
                                                            <Button onClick={() => handleDeleteApp(app.id)}>{`Delete App`}</Button>
                                                        </li>
                                                    </Denied>
                                                );
                                            }

                                        })
                                    }
                                </StyledUnorderedList>
                            </StyledBox>
                        )
                    }
                </StyledBox>
            )
        } else {
            return (      
                <StyledBox>
                    <Typography>You are not authorized to view this page.</Typography>
                    <Typography>Signed in as {session.user.email}</Typography>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                </StyledBox>
            );
        }
    } else {
        // not logged in
        return (
            <>
            {router.push(`/`)}
            </>
          )
    }
}

export default AdminUserDashboard;
