import { CustomRequest } from '../../middleware/auth.js';
import { Response } from 'express';
import prisma from '../../prisma/prismaClient.js';
import { JwtPayload } from 'jsonwebtoken';
import { adminAuth } from '../../utils/firebaseAdmin.js';

export const deleteUser = async (req: CustomRequest, res: Response) => {
    const userId = (req.user as JwtPayload & { userId: string }).userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, googleUid: true },
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        if (user.googleUid) {
            try {
                await adminAuth.deleteUser(user.googleUid);
            } catch (firebaseError) {
                console.error('Firebase deletion error:', firebaseError);
            }
        }
        await prisma.user.delete({ where: { id: userId } });

        // Clear the auth cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        res.status(200).json({
            success: true,
            message: 'User account deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete user error:', error);

        if (process.env.NODE_ENV === 'development') {
            res.status(500).json({
                error: 'Internal Server error',
                message: error.message,
                stack: error.stack,
                details: error,
            });
        } else {
            res.status(500).json({ error: 'Failed to delete user account' });
        }
    }
};
