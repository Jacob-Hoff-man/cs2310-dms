import { signIn, useSession } from 'next-auth/react';
import isAdmin from '../auth/admin';
import AdminUserDashboard from '../ui/comps/AdminUserDashboard/AdminUserDashboard';
import RegularUserDashboard from '../ui/comps/RegularUserDashboard/RegularUserDashboard';
import { StyledBox } from '../ui/comps/Index/indexPage.styles';
import { Button } from '@mui/material';
import prisma from '../../prisma/prisma';
import { AppType, Application, Appointment, Kid, Mentor } from '@prisma/client';

type Props = {
  applications: (Application & {
    user: {
        email: string | null;
    } | null;
  })[];
  kids: Kid[];
  mentors: Mentor[];
  appointments: (Appointment & {
    kid: {
        id: string;
        kidName: string;
    } | null;
    mentor: {
        id: string;
        mentorName: string;
    } | null;
  })[],
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
  const appointments = await prisma.appointment.findMany({
    include: {
      kid: {
        select: {
          id: true,
          kidName: true,
        }
      },
      mentor: {
        select: {
          id: true,
          mentorName: true,
        }
      }
    }
  });
  
  return {
    props: {
      applications,
      kids,
      mentors,
      appointments,
    }
  }
}

export default function Index({ applications, kids, mentors, appointments }: Props) {
  const { data: session } = useSession();

  if (session && typeof session.user !== 'undefined') {
    // logged in
    if (isAdmin(session.user.email)) {
      // map user emails
      let userEmails = new Map<string, string>();
      applications.forEach((app) => {
        if (app.userId !== null && app.user !== null && app.user.email !== null) {
          userEmails.set(app.userId, app.user.email);
        }
      }); 
      // get scheduled appts
      let scheduledAppts = appointments.filter((appt) => appt.isScheduled);
      // get scheduled appts mentors
      let scheduledApptsMentorsIds = scheduledAppts.map((appt) => appt.mentorId);
      let scheduledApptsMentors = mentors.filter((mentor) => scheduledApptsMentorsIds.includes(mentor.id));
      // get scheduled appts kids
      let scheduledApptsKidsIds = scheduledAppts.map((appt) => appt.kidId);
      let scheduledApptsKids = kids.filter((kid) => scheduledApptsKidsIds.includes(kid.id));
      return (
        <AdminUserDashboard 
          applications={applications}
          userEmails={userEmails}
          scheduledAppts={scheduledAppts}
          scheduledApptsMentors={scheduledApptsMentors}
          scheduledApptsKids={scheduledApptsKids}
        />
      );
    } else {
      // regular user
      // get user apps ids
      let userApps = applications.filter((app) => app.userId === session.user.id);
      let userAppsIds: string [] = userApps.map((app) => app.id); 
      // get user kids
      let userKids = kids.filter((kid) => userAppsIds.includes(kid.appId));
      // get all other kids
      let apptKids = kids.filter((kid) => !userKids.includes(kid));
      // get isUserMentor
      let userMentorAppExists = false;
      let userIsMentor = false;
      let userMentorApp = userApps.find((app) => app.appType == AppType.MENTOR);
      let userMentor: Mentor | undefined = undefined;
      if (typeof userMentorApp !== 'undefined') {
        // Mentor App already exists
        userMentorAppExists = true;
        userIsMentor = userMentorApp.isApproved;
        let userMentorAppId = userMentorApp.id;
        // get user Mentor obj
        userMentor = mentors.find((mentor) => mentor.appId === userMentorAppId);

      }
      // get unscheduled appts
      let userKidsIds: string [] = userKids.map((kid) => kid.id);
      let allUnscheduledAppts = appointments.filter((appt) => !appt.isScheduled);
      let userUnscheduledAppts = allUnscheduledAppts.filter((appt) => userKidsIds.includes(appt.kidId as string));
      let userUnscheduledApptsIds = userUnscheduledAppts.map((appt) => appt.id);
      let allUnscheduledApptsExcludeUsers = allUnscheduledAppts.filter((appt) => !userUnscheduledApptsIds.includes(appt.id));
      // get scheduled appts
      let allScheduledAppts = appointments.filter((appt) => appt.isScheduled);
      let userScheduledAppts = allScheduledAppts.filter((appt) => 
        userKidsIds.includes(appt.kidId as string) || 
        (userIsMentor && (userMentor as Mentor).id === appt.mentorId)
      );
      // get scheduled appts mentors
      let userScheduledApptsMentorIds = userScheduledAppts.map((appt) => appt.mentorId);
      let scheduledApptsMentors = mentors.filter((mentor) => userScheduledApptsMentorIds.includes(mentor.id));
      
      return (
        <RegularUserDashboard
          userApplications={userApps}
          userKids={userKids}
          apptKids={apptKids}
          userMentor={userMentor}
          userMentorAppExists={userMentorAppExists}
          userIsMentor={userIsMentor}
          userUnscheduledAppointments={userUnscheduledAppts}
          unscheduledAppointments={allUnscheduledApptsExcludeUsers}
          userScheduledAppointments={userScheduledAppts}
          scheduledApptsMentors={scheduledApptsMentors}
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
