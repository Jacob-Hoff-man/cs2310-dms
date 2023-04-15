
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Appointment } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';


export default async (req: NextApiRequest, res: NextApiResponse<Appointment>) => {
  const apptId = req.body as string;
  try {
    const deletedAppt = await prisma.appointment.delete({
        where: {
            id: apptId,
        }
    });
    res.status(200).json(deletedAppt);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};