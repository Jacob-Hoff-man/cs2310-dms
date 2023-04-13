
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Kid } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Kid>) => {
  const kidId = req.body as string;
  try {
    const deletedKid = await prisma.kid.delete({
        where: {
            id: kidId,
        }
    });
    res.status(200).json(deletedKid);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};