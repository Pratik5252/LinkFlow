import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';
import { generateToken } from '../../utils/generateToken.js';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid Credentials' });
            return;
        }
        if (!user.password) {
            res.status(403).json({
                message:
                    'You have registered using a social provider. Please log in with Google.',
            });
            return;
        }

        const match = await bcrypt.compare(password, user.password!);

        if (!match) {
            res.status(400).json({ message: 'Invalid Credentials' });
            return;
        }

        const token = generateToken(user.id);

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });

        res.status(201).json({
            success: true,
            message: 'Login Successful',
            user: { id: user.id, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};
