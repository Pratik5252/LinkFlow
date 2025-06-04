import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { CustomRequest } from "../../middleware/auth";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

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

    res.json(user?.urls);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
