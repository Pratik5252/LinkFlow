import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};
