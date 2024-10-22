import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';
import moment from 'moment-timezone';

export default async function handler(req: { headers: { authorization: any; }; method: string; body: { name: any; email: any; phone: any; address: any; timezone: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  if (req.method === 'POST') {
    const { name, email, phone, address, timezone } = req.body;

    try {
      const contact = await prisma.contact.create({
        data: {
          name, email, phone, address, timezone, userId
        }
      });
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: 'Contact creation failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
