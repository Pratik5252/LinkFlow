import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prismaClient";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../../config/jwt";
import { generateToken } from "../../utils/generateToken";
import { strict } from "assert";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password!);

    if (!match) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = generateToken(user.id);

    res.status(201).json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};
