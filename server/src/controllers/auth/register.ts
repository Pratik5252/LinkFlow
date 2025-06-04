import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User Already exist" });
      return;
    }

    const hashedPassord = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassord,
      },
    });

    res.status(201).json({
      message: "User Created Successfully",
      user: { email: user.email, id: user.id },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
