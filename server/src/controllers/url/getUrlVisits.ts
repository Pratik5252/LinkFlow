import { Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";

export const getUrlVisits = async (req: CustomRequest, res: Response) => {
  const { urlId } = req.params;

  try {
    const url = await prisma.url.findUnique({
      where: { id: urlId },
      include: { visits: true },
    });

    if (!url) {
      res.status(404).json({ message: "Url not found" });
      return;
    }
    if (url.userId !== (req.user as JwtPayload & { userId: string }).userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    res.json({ visits: url.visits, visitCount: url.visits.length });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
