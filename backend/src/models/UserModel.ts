import { PrismaClient, Beneficiary, User, Donor, Tag, Location, Listing} from '@prisma/client';

const prisma = new PrismaClient();

interface UserCreateInput {
  email: string;
  role: 'donor' | 'beneficiary';
  password: string;
  size: number;
  tags: number[];
  location: { lat: number, lng: number};
}

export {prisma, UserCreateInput, Beneficiary, User, Donor, Tag, Location, Listing};
