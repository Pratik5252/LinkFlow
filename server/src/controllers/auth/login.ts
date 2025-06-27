import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../prisma/prismaClient.js";
import { generateToken } from "../../utils/generateToken.js";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }
    if (!user.password) {
      res.status(403).json({
        message:
          "You have registered using a social provider. Please log in with Google.",
      });
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
