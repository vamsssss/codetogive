// import { Request, Response } from "express";
// import { MatchingServiceImpl }  from "../services/impl/MatchingServiceImpl";
// import { Listing, Beneficiary } from "../models/UserModel";

// export class MatchingServiceController {
//   constructor(private matchingService: MatchingServiceImpl) {}

//   matchBeneficiaries = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { listing, beneficiaries } = req.body;

//       if (!listing || !beneficiaries || !Array.isArray(beneficiaries)) {
//         res.status(400).send("Invalid request body. Listing and beneficiaries array are required.");
//         return;
//       }

//       const matches = await this.matchingService.matchBeneficiaries(
//         listing as Listing,
//         beneficiaries as Beneficiary[]
//       );

//       res.status(200).json(matches);
//     } catch (err) {
//       res.status(500).send((err as Error).message);
//     }
//   };

// }