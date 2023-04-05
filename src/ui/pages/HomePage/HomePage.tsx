import { ReactElement } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { StyledBox } from './homePage.styles';
import MainLayout from '../../layouts/MainLayout';
import { useSession, signIn, signOut } from 'next-auth/react';
import isAdmin from '../../../auth/admin';

const HomePage = () => {
  const { data: session } = useSession();
  return (
    <Container maxWidth={false}>
      <StyledBox>
        <Typography component="h1" color="primary">
          FRONT-END: Material UI v5 with Next.js 12.1.6 and emotion/styled 11.10 in TypeScript.
        </Typography>
        <Typography component="h2" color="secondary">
          CI ACTIONS: ESLint (Airbnb) integration with Next and Jest/React testing libraries integration with Next.
        </Typography>
        <Typography component="h3" color="error">
          Boilerplate for building faster.
        </Typography>
      </StyledBox>
      
      <StyledBox>
        {
        (session && typeof session.user !== 'undefined') ? (
          <>
            Signed in as {session.user.email} <br />
            {
              isAdmin(session.user.email) && (
                <Typography component="h1" color="primary">
                  Admin User
                </Typography>
                )
            }
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        )
        : (
          <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign</button>
          </>
        )
        }
      </StyledBox>
    </Container>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{page}</MainLayout>
  );
};

export default HomePage;
