import { Response } from "express";
import { CustomRequest } from "../../middleware/auth.js";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma/prismaClient.js";

const baseUrl = process.env.BASE_URL;
export const getAllUrls = async (req: CustomRequest, res: Response) => {
  const userId = (req.user as JwtPayload & { userId: string }).userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { urls: { include: { _count: { select: { visits: true } } } } },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const urlsWithShotLink = user.urls.map((url: any) => ({
      ...url,
      shortLink: `${baseUrl}/${url.shortUrl}`,
    }));

    res.json(urlsWithShotLink);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
