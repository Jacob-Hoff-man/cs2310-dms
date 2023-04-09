import { useRouter } from 'next/router';
import { signIn, useSession, getSession } from 'next-auth/react';
import isAdmin from '../auth/admin';
import AdminUserDashboard from '../ui/comps/AdminUserDashboard/AdminUserDashboard';
import RegularUserDashboard from '../ui/comps/RegularUserDashboard/RegularUserDashboard';
import { StyledBox } from '../ui/comps/Index/indexPage.styles';
import { Button } from '@mui/material';
import prisma from '../../prisma/prisma';
import { Application } from '@prisma/client';

type Props = {
  applications: Application [];
}
export const getServerSideProps = async () => {
  const applications = await prisma.application.findMany();
  // const kids
  // const mentors
  // const applications
  
  return {
    props: {
      applications,
    }
  }
}

export default function Index({ applications }: Props) {
  const { data: session } = useSession();

  if (session && typeof session.user !== 'undefined') {
    // logged in
    if (isAdmin(session.user.email)) {
      return (
        <AdminUserDashboard 
          applications={applications}
        />
      )
    } else {
      return <RegularUserDashboard/>
    }
  } else {
    // not logged in
    return (
      <StyledBox>
        <Button onClick={() => signIn()}>Sign In Using Email Address</Button>
      </StyledBox>
    );
  }
}
