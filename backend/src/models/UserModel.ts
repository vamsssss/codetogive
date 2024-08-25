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

interface ListingCreateInput {
  title: string;
  description: string;
  quantity: number;
  donorId: number;
  tags: { id: number }[];
  beneficiaries: { id: number }[];
}

export {prisma, UserCreateInput, Beneficiary, User, Donor, Tag, Location, Listing, ListingCreateInput};