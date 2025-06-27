import prisma from "../../prisma/prismaClient.js";
import { Response, Request } from "express";
import { CustomRequest } from "../../middleware/auth.js";
import { JwtPayload } from "jsonwebtoken";
import { nanoid } from "nanoid";

export const createShortUrl = async (req: CustomRequest, res: Response) => {
  const { originalUrl, customUrl, title } = req.body;
  const userId = (req.user as JwtPayload & { userId: string }).userId;

  if (!originalUrl) {
    res.status(400).json({ message: "Original Url is Required" });
    return;
  }
  try {
    const urlExist = await prisma.url.findUnique({
      where: {
        userId_originalUrl: {
          userId,
          originalUrl,
        },
      },
    });
    if (urlExist) {
      res.status(409).json({ message: "Url Already exist" });
      return;
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

    const shortLink = `http://localhost:3000/${newUrl.shortUrl}`;
    res.status(201).json({ ...newUrl, shortLink });
  } catch (err) {
    res.status(500).json({ error: "Failed to create short URL" });
  }
};
