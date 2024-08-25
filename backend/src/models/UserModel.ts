import { PrismaClient, User, Tag, Listing } from "@prisma/client";

const prisma = new PrismaClient();

interface UserCreateInput {
  email: string;
  name?: string;
  role: string;
  password: string;
  tags: { id: number }[];
  size?: number;
  location: { id: number; lat: number; lng: number };
}

interface ListingCreateInput {
  title: string;
  description: string;
  quantity: number;
  donorId: number;
  tags: { id: number }[];
  beneficiaries: { id: number }[];
}

export { prisma, UserCreateInput, User, Tag, Listing, ListingCreateInput };
