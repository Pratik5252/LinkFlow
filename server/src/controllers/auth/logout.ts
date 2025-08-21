import { Request, Response } from 'express';

export const logout = async (req: Request, res: Response) => {
    try {
        // Clear the HttpOnly cookie
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // sameSite: 'strict',
            path: '/',
        });

        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: err,
        });
    }
};
