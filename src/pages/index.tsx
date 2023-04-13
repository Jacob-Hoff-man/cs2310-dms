import { signIn, useSession } from 'next-auth/react';
import isAdmin from '../auth/admin';
import AdminUserDashboard from '../ui/comps/AdminUserDashboard/AdminUserDashboard';
import RegularUserDashboard from '../ui/comps/RegularUserDashboard/RegularUserDashboard';
import { StyledBox } from '../ui/comps/Index/indexPage.styles';
import { Button } from '@mui/material';
import prisma from '../../prisma/prisma';
import { AppType, Application, Kid, Mentor } from '@prisma/client';

type Props = {
  applications: (Application & {
    user: {
        email: string | null;
    } | null;
  })[];
  kids: Kid[];
  mentors: Mentor[];
};

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
  const kids = await prisma.kid.findMany();
  const mentors = await prisma.mentor.findMany();
  // const applications
  
  return {
    props: {
      applications,
      kids,
      mentors
    }
  }
}

export default function Index({ applications, kids, mentors }: Props) {
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
      );
    } else {
      // regular user
      // get user apps ids
      let userApps = applications.filter((app) => app.userId === session.user.id);
      let userAppsIds: string [] = userApps.map((app) => app.id); 
      // get user kids
      let userKids = kids.filter((kid) => userAppsIds.includes(kid.appId));
      // get isUserMentor
      let userMentorAppExists = false;
      let userIsMentor = false;
      let userMentorApp = userApps.find((app) => app.appType == AppType.MENTOR);
      if (typeof userMentorApp !== 'undefined') {
        // Mentor App already exists
        userMentorAppExists = true;
        userIsMentor = userMentorApp.isApproved;
      }
      return (
        <RegularUserDashboard
          userApplications={userApps}
          userKids={userKids}
          userMentorAppExists={userMentorAppExists}
          userIsMentor={userIsMentor}
        />
      );
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
