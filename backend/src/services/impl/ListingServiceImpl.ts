import { prisma, ListingCreateInput, Listing } from "../../models/UserModel";
import IListingService from "../IListingService";

class ListingServiceImpl implements IListingService {
  async createListing(data: ListingCreateInput): Promise<Listing> {
    return await prisma.listing.create({
      data: {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        donorId: data.donorId,
        tags: {
          connect: data.tags,
        },
        beneficiaries: {
          connect: data.beneficiaries,
        },
      },
    });
  }

  async updateListing(
    id: number,
    data: ListingCreateInput
  ): Promise<Listing | null> {
    return await prisma.listing.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        donorId: data.donorId,
        tags: {
          connect: data.tags,
        },
        beneficiaries: {
          connect: data.beneficiaries,
        },
      },
    });
  }

  async deleteListing(id: number): Promise<Listing | null> {
    return await prisma.listing.delete({
      where: { id },
    });
  }

  async getListing(id: number): Promise<Listing | null> {
    return await prisma.listing.findUnique({
      where: { id },
    });
  }
}

export default new ListingServiceImpl();
