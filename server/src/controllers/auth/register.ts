import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';
import { generateToken } from '../../utils/generateToken.js';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User Already exist' });
            return;
        }

        const hashedPassord = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassord,
            },
        });

        // Generate token and set HttpOnly cookie
        const token = generateToken(user.id);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            user: { email: user.email, id: user.id },
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
