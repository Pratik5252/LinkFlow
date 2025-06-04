import { Request, Response } from "express";
import { getClientDetails } from "../../utils/getLocation";
import prisma from "../../prisma/prismaClient";

export const redirectUrl = async (req: Request, res: Response) => {
  const { shorturl } = req.params;
  const client = getClientDetails(req);

  try {
    const url = await prisma.url.findUnique({ where: { shortUrl: shorturl } });

    if (!url) {
      res.status(400).json({ message: "Short Url not found" });
      return;
    }

    await prisma.visit.create({
      data: {
        urlId: url.id,
        ip: client.ip,
        location: client.location,
        browser: client.browser,
        os: client.os,
        device: client.device,
      },
    });

    res.redirect(url!.originalUrl);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
