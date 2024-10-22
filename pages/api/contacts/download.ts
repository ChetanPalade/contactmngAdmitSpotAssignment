import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/db';
import { validateJwt } from '../../middleware/auth';
import { generateCSV } from '../../utils/fileHandlers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = validateJwt(req);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const contacts = await prisma.contact.findMany({
        where: { userId: token.userId, deleted: false },
    });

    const csvData = generateCSV(contacts);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
    res.status(200).send(csvData);
}
