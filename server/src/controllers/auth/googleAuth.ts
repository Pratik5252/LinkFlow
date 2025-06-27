import prisma from "../../prisma/prismaClient.js";
import { adminAuth } from "../../utils/firebaseAdmin.js";
import { Request, Response } from "express";
import { generateToken } from "../../utils/generateToken.js";

export const googleAuth = async (req: Request, res: Response) => {
  const { idToken } = req.body;

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);
    const { uid, email } = decoded;

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      if (!user.googleUid) {
        user = await prisma.user.update({
          where: { email },
          data: { googleUid: uid },
        });
      }
    } else {
      if (email) {
        user = await prisma.user.create({
          data: {
            email,
            googleUid: uid,
          },
        });
      }
    }

    if (user) {
      const token = generateToken(user.id);
      res.json({ user, token });
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid Google token" });
  }
};
