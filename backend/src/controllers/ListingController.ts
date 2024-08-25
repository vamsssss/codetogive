import { Request, Response } from "express";
import ListingServiceImpl from "../services/impl/ListingServiceImpl";

class ListingController {
  async createListing(req: Request, res: Response): Promise<void> {
    try {
      const listing = await ListingServiceImpl.createListing(req.body);
      res.status(201).send(listing);
    } catch (err) {
      if (
        !req.body.title ||
        !req.body.description ||
        !req.body.quantity ||
        !req.body.donorId
      ) {
        res.status(400).send("All fields are required");
      } else {
        res.status(500).send((err as Error).message);
      }
    }
  }

  async deleteListing(req: Request, res: Response): Promise<void> {
    try {
      const listing = await ListingServiceImpl.deleteListing(
        Number(req.params.id)
      );
      if (listing) {
        res.status(200).send(listing);
      } else {
        res.status(404).send("Listing not found");
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }

  async getListing(req: Request, res: Response): Promise<void> {
    try {
      const listing = await ListingServiceImpl.getListing(
        Number(req.params.id)
      );
      if (listing) {
        res.status(200).send(listing);
      } else {
        res.status(404).send("Listing not found");
      }
    } catch (err) {
      res.status(500).send((err as Error).message);
    }
  }
}

export default new ListingController();
