import { Approved, Denied, StyledBox, StyledUnorderedList } from './adminUserDashboard.styles';
import { signOut, useSession } from 'next-auth/react';
import isAdmin from '../../../auth/admin';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Application, AppType, Kid, Mentor } from '@prisma/client';
import { deleteApp, updateAppIsApproved } from '../../../endpoints/application';
import { useState } from 'react';
import { addNewKid, deleteKidByAppId } from '../../../endpoints/kid';
import { addNewMentor, deleteMentorByAppId } from '../../../endpoints/mentor';

type Props = {
    applications: Application [];
    userEmails: Map<string, string>;
}

function AdminUserDashboard({ applications, userEmails }: Props) {
    const [currentApps, setCurrentApps] = useState(applications);
    const [currentUserEmails, setCurrentUserEmails] = useState(userEmails);

    const { data: session } = useSession();
    const router = useRouter();
    const toggleIsApproved = async (appId: string, isApproved: boolean) => {
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


    if (session && typeof session.user !== 'undefined') {
        if (isAdmin(session.user.email)) {
            return (
                <StyledBox>
                    <Typography variant='h6'>Welcome to the Admin Dashboard page!</Typography>
                    <Typography>Signed in as {session.user.email}</Typography>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                    {
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
                                                            <Button onClick={() => toggleIsApproved(app.id, false)}>{`Deny App`}</Button>
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
                                                            <Button onClick={() => toggleIsApproved(app.id, true)}>{`Accept App`}</Button>
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
