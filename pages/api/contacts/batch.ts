import { handleFileUpload } from '../../utils/fileHandlers';
import { validateJwt } from '../../middleware/auth';
import { prisma } from '../../utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const token = validateJwt(req);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const contacts = await handleFileUpload(req);

        for (const contact of contacts) {
            await prisma.contact.upsert({
                where: { email: contact.email },
                create: { ...contact, userId: token.userId },
                update: { ...contact }
            });
        }

        return res.status(200).json({ message: 'Contacts added/updated successfully' });
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
