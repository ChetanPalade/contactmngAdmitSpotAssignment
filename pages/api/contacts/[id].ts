import { prisma } from '../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const contact = await prisma.contact.findUnique({ where: { id: Number(id) } });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        return res.status(200).json({ contact });
    }

    if (req.method === 'PUT') {
        const updatedData = req.body;
        const contact = await prisma.contact.update({
            where: { id: Number(id) },
            data: updatedData
        });

        return res.status(200).json({ contact });
    }

    if (req.method === 'DELETE') {
        await prisma.contact.update({
            where: { id: Number(id) },
            data: { deleted: true }
        });

        return res.status(204).end();
    }
}
