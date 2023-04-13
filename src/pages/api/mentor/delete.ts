
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Mentor } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Mentor>) => {
  const appId = req.body as string;
  try {
    const deletedMentor = await prisma.mentor.delete({
        where: {
            appId: appId,
        }
    });
    res.status(200).json(deletedMentor);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};