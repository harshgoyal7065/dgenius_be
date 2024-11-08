import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth.util';

export const authenticate = (role: 'admin' | 'sub-user') => (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = verifyToken(token) as any;
    if (decoded.role !== role) return res.status(403).json({ error: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
