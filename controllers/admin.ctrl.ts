import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: { username, password: hashedPassword }
    });
    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    res.status(400).json({ message: 'Admin registration failed', error });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: admin.id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const getSubUsers = async (req: any, res: Response) => {
  const { userId } = req.user;

  try {
    const subUsers = await prisma.subUser.findMany({ where: { adminId: userId } });
    res.json(subUsers);
  } catch (error) {
    res.status(500).json({ message: 'Could not retrieve sub-users', error });
  }
};

export const createSubUser = async (req: any, res: Response) => {
  const { username, password } = req.body;
  const { userId } = req.user;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const subUser = await prisma.subUser.create({
      data: {
        username,
        password: hashedPassword,
        adminId: userId
      }
    });
    res.status(201).json({ message: 'Sub-user created successfully', subUser });
  } catch (error) {
    res.status(400).json({ message: 'Could not create sub-user', error });
  }
};
