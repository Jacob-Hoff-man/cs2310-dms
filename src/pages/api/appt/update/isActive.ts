
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Appointment>) => {
  const {
    apptId,
    isActive
  } = req.body;
  try {
    const updatedApptIsApproved = await prisma.appointment.update({
      where: {
        id: apptId,
      },
      data: {
        isActive
      }
    });
    res.status(200).json(updatedApptIsApproved);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};
