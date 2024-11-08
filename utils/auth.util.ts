import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const generateToken = (payload: object) => {
    if(secret) {
        return jwt.sign(payload, secret, { expiresIn: '1h' });
    }
    return '';
};

export const verifyToken = (token: string) => {
    if(secret) {
        return jwt.verify(token, secret);
    }
    return '';
};
