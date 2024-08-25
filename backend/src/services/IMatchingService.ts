import { Beneficiary, Listing } from "../models/UserModel";

interface IMatchingService {
  matchBeneficiaries(listing : Listing, beneficiaries: Beneficiary[]): Promise<Beneficiary[]>;
}

export default IMatchingService;