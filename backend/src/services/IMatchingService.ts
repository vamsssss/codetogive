import { User, Listing } from "../models/UserModel";

interface IMatchingService {
  matchBeneficiaries(listing : Listing): Promise<User[]>;
}

export default IMatchingService;