import { PrismaClient, Broadcast} from '@prisma/client';

const prisma = new PrismaClient();

export {prisma, Broadcast};