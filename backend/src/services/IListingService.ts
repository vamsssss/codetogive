import { Listing, ListingCreateInput } from "../models/UserModel";

interface IListingService {
  createListing(data: ListingCreateInput): Promise<Listing>;
  updateListing(id: number, data: ListingCreateInput): Promise<Listing | null>;
  deleteListing(id: number): Promise<Listing | null>;
  getListing(id: number): Promise<Listing | null>;
}

export default IListingService;
