import { prisma } from '../../utils/db';
import { compare } from 'bcryptjs';
import { signJwt } from '../../utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = signJwt({ userId: user.id });

        return res.status(200).json({ token });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
