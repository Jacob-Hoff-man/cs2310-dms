
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Mentor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Mentor>) => {
  const mentor = req.body as Mentor;
  try {
    const addedMentor = await prisma.mentor.create({
      data: {
        mentorName: mentor.mentorName,
        appId: mentor.appId
      }
    });
    res.status(200).json(addedMentor);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};