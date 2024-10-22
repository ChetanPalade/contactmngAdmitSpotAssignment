import { validateUserRegistration } from '../../middleware/validation';
import { prisma } from '../../utils/db';
import { hash } from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        validateUserRegistration(req, res, async () => {
            const { name, email, password } = req.body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await hash(password, 10);
            await prisma.user.create({
                data: { name, email, password: hashedPassword, verified: false }
            });

            return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
        });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
