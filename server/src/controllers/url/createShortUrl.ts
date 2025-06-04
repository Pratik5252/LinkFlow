import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { CustomRequest } from "../../middleware/auth";
import { JwtPayload } from "jsonwebtoken";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export const createShortUrl = async (req: CustomRequest, res: Response) => {
  const { originalUrl, customUrl, title } = req.body;
  const userId = (req.user as JwtPayload & { userId: string }).userId;

  if (!originalUrl) {
    res.status(400).json({ message: "Original Url is Required" });
  }
  try {
    const urlExist = await prisma.url.findUnique({ where: { originalUrl } });
    if (urlExist) {
      res.status(409).json({ message: "Url Already exist" });
    }

    const shortUrl = customUrl || nanoid(7);

    const newUrl = await prisma.url.create({
      data: {
        originalUrl,
        shortUrl,
        title,
        userId,
      },
    });

    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: "Failed to create short URL" });
  }
};
