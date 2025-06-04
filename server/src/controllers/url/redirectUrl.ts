import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const redirectUrl = async (req: Request, res: Response) => {
  const { shorturl } = req.params;
  console.log(shorturl);

  try {
    const url = await prisma.url.findUnique({ where: { shortUrl: shorturl } });
    console.log(url);

    if (!url) {
      res.status(400).json({ message: "Short Url not found" });
    }

    res.redirect(url!.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
