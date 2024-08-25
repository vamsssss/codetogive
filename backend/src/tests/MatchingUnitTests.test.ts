import MatchingServiceImpl from '../services/impl/MatchingServiceImpl';
import MatchingServiceController from '../controllers/MatchingController';
import { Listing, Beneficiary, Location, Tag } from '../models';

jest.mock('./MatchingService');

const mockMatchingService: jest.Mocked<MatchingService> = {
  matchBeneficiaries: jest.fn(),
};

describe('MatchingController', () => {
  let matchingController: MatchingController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    matchingController = new MatchingController(mockMatchingService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  describe('matchBeneficiariesToListing', () => {
    it('should return matched beneficiaries', async () => {
      const listing: Listing = {
        id: 1,
        title: 'Food Donation',
        description: 'Vegan food',
        quantity: 100,
        donorId: 1,
        tags: [{ id: 1, name: 'vegan' }],
        beneficiaries: [],
        createdAt: new Date(),
      };
      const beneficiaries: Beneficiary[] = [
        { userId: 1, size: 50, user: { id: 1, email: 'b1@example.com', name: 'Beneficiary 1', password: 'hashedPassword', createdAt: new Date(), updatedAt: new Date(), tags: [] } },
        { userId: 2, size: 30, user: { id: 2, email: 'b2@example.com', name: 'Beneficiary 2', password: 'hashedPassword', createdAt: new Date(), updatedAt: new Date(), tags: [] } },
      ];
      const expectedMatches = [beneficiaries[0]];

      mockMatchingService.matchBeneficiaries.mockResolvedValue(expectedMatches);

      mockRequest.params = { listingId: '1' };

      await matchingController.matchBeneficiariesToListing(mockRequest as Request, mockResponse as Response);

      expect(mockMatchingService.matchBeneficiaries).toHaveBeenCalledWith(listing, beneficiaries);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedMatches);
    });

    it('should handle no matches found', async () => {
      mockMatchingService.matchBeneficiaries.mockResolvedValue([]);

      mockRequest.params = { listingId: '1' };

      await matchingController.matchBeneficiariesToListing(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([]);
    });

    it('should handle errors', async () => {
      mockMatchingService.matchBeneficiaries.mockRejectedValue(new Error('Matching failed'));

      mockRequest.params = { listingId: '1' };

      await expect(matchingController.matchBeneficiariesToListing(mockRequest as Request, mockResponse as Response))
        .rejects.toThrow('Matching failed');
    });
  });
});
