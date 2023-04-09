import { Typography, Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import { StyledBox } from './regularUserDashboard.styles';
import { useRouter } from 'next/router';

function RegularUserDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    
    if (session && typeof session.user !== 'undefined') {
        return (
            <StyledBox>
                <Typography>Welcome to the Regular Dashboard page!</Typography>
                <Typography>Signed in as {session.user.email}</Typography>
                <Button onClick={() => signOut()}>Sign Out</Button>
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

