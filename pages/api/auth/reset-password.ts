import { prisma } from '../../utils/db';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, newPassword, otp } = req.body;

        // Mock OTP verification
        if (otp !== '123456') {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const hashedPassword = await hash(newPassword, 10);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        return res.status(200).json({ message: 'Password reset successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
