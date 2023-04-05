import { ReactElement } from 'react';
import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import { StyledBox } from './homePage.styles';
import MainLayout from '../../layouts/MainLayout';
import { useSession, signIn, signOut } from 'next-auth/react';
import isAdmin from '../../../auth/admin';
import RegularUserDashboard from '../../comps/RegularUserDashboard';
import AdminUserDashboard from '../../comps/AdminUserDashboard';

const HomePage = () => {
  const { data: session } = useSession();
  if (session && typeof session.user !== 'undefined') {
    // logged in
    return (
      <>
        Signed in as {session.user.email}
        <Button onClick={() => signOut()}>Sign Out</Button>
        {
          isAdmin(session.user.email) ? (
            <AdminUserDashboard />
          ) : (
            <RegularUserDashboard />
          )
        }
      </>
    );
  } else {
    // not logged in
    return (
      <StyledBox>
        <Button onClick={() => signIn()}>Sign In Using Email Address</Button>
      </StyledBox>
    );
  }
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>{page}</MainLayout>
  );
};

export default HomePage;
