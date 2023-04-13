
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Application, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<Application>) => {
  const appId = req.body as string;
  try {
    const deletedApp = await prisma.application.delete({
        where: {
            id: appId,
        }
    });
    res.status(200).json(deletedApp);
  } catch (error) {
    res.status(403)
    console.log(error);
  }
};