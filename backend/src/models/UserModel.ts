import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

interface UserCreateInput {
    email: string;
    name?: string;
    role: string;
    password: string;
    tags: { id: number }[];
    size?: number;
  }

export {prisma, UserCreateInput, User};
