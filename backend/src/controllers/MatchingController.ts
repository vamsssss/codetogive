import { Request, Response } from "express";
import IMatchingService from "../services/IMatchingService";
import ListingController from "../services/impl/ListingServiceImpl";

class MatchingController {
  constructor(private matchingService: IMatchingService) {}

  matchBeneficiaries = async (req: Request, res: Response): Promise<void> => {
    try {
      const listingId = parseInt(req.params.listingId);
      const listing = await ListingController.getListing(listingId);

      if (listing === null) {
        res.status(400).send("No valid listing for this");
        return;
      }
      const matches = await this.matchingService.matchBeneficiaries(listing);

      res.status(200).json(matches);
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  };

}

export default MatchingController;