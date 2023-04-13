
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Application } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Application>) => {
  const {
    appId,
    isApproved
  } = req.body;
  try {
    const updatedAppIsApproved = await prisma.application.update({
      where: {
        id: appId,
      },
      data: {
        isApproved
      },
      include: {
        user: true,
      }
    });
    res.status(200).json(updatedAppIsApproved);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};
