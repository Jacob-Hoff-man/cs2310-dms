
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Kid } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Kid>) => {
  const kid = req.body as Kid;
  try {
    const addedKid = await prisma.kid.create({
      data: {
        kidName: kid.kidName,
        appId: kid.appId
      }
    });
    res.status(200).json(addedKid);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};