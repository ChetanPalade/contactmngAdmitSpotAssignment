import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';

export const userRegistrationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    address: Joi.string().max(255).optional(),
    timezone: Joi.string().optional(),
});

export function validateUserRegistration(req: NextApiRequest, res: NextApiResponse, next: Function) {
    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

export function validateContact(req: NextApiRequest, res: NextApiResponse, next: Function) {
    const { error } = contactSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}
