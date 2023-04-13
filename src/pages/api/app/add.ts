
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Application } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../prisma/prisma';

export default async (req: NextApiRequest, res: NextApiResponse<Application>) => {
  const app = req.body as Application;
  try {
    const addedApp = await prisma.application.create({
      data: {
        title: app.title,
        content: app.content,
        appType: app.appType,
        userId: app.userId,
        kidName: app.kidName
      }
    });
    res.status(200).json(addedApp);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};