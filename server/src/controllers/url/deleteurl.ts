import { CustomRequest } from "../../middleware/auth";
import { Response } from "express";
import prisma from "../../prisma/prismaClient";
import { JwtPayload } from "jsonwebtoken";

export const deleteUrl = async (req: CustomRequest, res: Response) => {
  const { urlId } = req.params;
  try {
    const url = await prisma.url.delete({ where: { id: urlId } });
    if (!url) {
      res.status(404).json({ message: "Url not found" });
      return;
    }

    if (url.userId !== (req.user as JwtPayload & { userId: string }).userId) {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }
    res.status(200).json({ message: `Deleted url ${url.originalUrl}` });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
};
