import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from '../utils/jwt';

export function validateJwt(req: NextApiRequest) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
        return verifyJwt(token);
    } catch (error) {
        return null;
    }
}
