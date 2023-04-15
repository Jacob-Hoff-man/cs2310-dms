
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Appointment>) => {
  const appt = req.body as Appointment;
  try {
    const addedAppt = await prisma.appointment.create({
      data: {
        startTime: appt.startTime,
        endTime: appt.endTime,
        kidId: appt.kidId
      }
    });
    res.status(200).json(addedAppt);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};