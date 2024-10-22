import { validateContact } from '../../middleware/validation';
import { prisma } from '../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateJwt } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = validateJwt(req);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        validateContact(req, res, async () => {
            const { name, email, phone, address, timezone } = req.body;

            const existingContact = await prisma.contact.findUnique({ where: { email } });
            if (existingContact) {
                return res.status(400).json({ message: 'Contact with this email already exists' });
            }

            const contact = await prisma.contact.create({
                data: { name, email, phone, address, timezone, userId: token.userId }
            });

            return res.status(201).json({ contact });
        });
    } else if (req.method === 'GET') {
        const { filter, sort } = req.query;

        const contacts = await prisma.contact.findMany({
            where: {
                userId: token.userId,
                deleted: false,
                ...(filter && { name: { contains: filter as string } }),
            },
            orderBy: {
                createdAt: sort === 'asc' ? 'asc' : 'desc',
            },
        });

        return res.status(200).json({ contacts });
    } else if (req.method === 'DELETE') {
        const { id } = req.query;

        await prisma.contact.update({
            where: { id: parseInt(id as string) },
            data: { deleted: true }
        });

        return res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
