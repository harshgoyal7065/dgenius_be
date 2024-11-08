import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginSubUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const subUser = await prisma.subUser.findUnique({ where: { username } });
    if (!subUser || !(await bcrypt.compare(password, subUser.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: subUser.id, role: 'sub-user' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const getSubUserProfile = async (req: any, res: Response) => {
  const { userId } = req.user;

  try {
    const subUser = await prisma.subUser.findUnique({
      where: { id: userId },
      include: { admin: true }  // Include associated admin details
    });
    res.json(subUser);
  } catch (error) {
    res.status(500).json({ message: 'Could not retrieve profile', error });
  }
};
