import { signIn, useSession } from 'next-auth/react';
import isAdmin from '../auth/admin';
import AdminUserDashboard from '../ui/comps/AdminUserDashboard/AdminUserDashboard';
import RegularUserDashboard from '../ui/comps/RegularUserDashboard/RegularUserDashboard';
import { StyledBox } from '../ui/comps/Index/indexPage.styles';
import { Button } from '@mui/material';
import prisma from '../../prisma/prisma';
import { Application } from '@prisma/client';

type Props = {
  applications: (Application & {
    user: {
        email: string | null;
    } | null;
})[];
}
export const getServerSideProps = async () => {
  const applications = await prisma.application.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
        }
      }
    }
  });
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
      let userEmails = new Map<string, string>();
      applications.forEach((app) => {
        if (app.userId !== null && app.user !== null && app.user.email !== null) {
          userEmails.set(app.userId, app.user.email);
        }
      }); 
      return (
        <AdminUserDashboard 
          applications={applications}
          userEmails={userEmails}
        />
      )
    } else {
      return (
        <RegularUserDashboard
          userApplications={ applications.filter((app) => app.userId === session.user.id) }
        />
      )
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
