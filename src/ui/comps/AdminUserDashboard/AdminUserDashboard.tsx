import { StyledBox } from './adminUserDashboard.styles';
import { signOut, useSession } from 'next-auth/react';
import isAdmin from '../../../auth/admin';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Application } from '@prisma/client';

type Props = {
    applications: Application [];
}

function AdminUserDashboard({ applications }: Props) {
    const { data: session } = useSession();
    const router = useRouter();

    if (session && typeof session.user !== 'undefined') {
        if (isAdmin(session.user.email)) {
            return (
                <StyledBox>
                    <Typography>Welcome to the Admin Dashboard page!</Typography>
                    <Typography>Signed in as {session.user.email}</Typography>
                    <Button onClick={() => signOut()}>Sign Out</Button>
                    {
                        applications.length > 0 && (
                            <div>
                                {`Applications:`}
                                <ul>
                                    {
                                        applications.map((app) => (
                                            <li>
                                                {app.id}
                                                {`   `}
                                                {app.title}
                                                {`   `}
                                                {app.appType}
                                                {`   `}
                                                {app.isApproved}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
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
