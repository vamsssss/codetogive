import { PrismaClient, User, Tag } from '@prisma/client';

const prisma = new PrismaClient();

interface UserCreateInput {
    email: string;
    name?: string;
    role: string;
    password: string;
    tags: { id: number }[];
    size?: number;
    location: { id: number, lat: number, lng: number};
}

export {prisma, UserCreateInput, User};
