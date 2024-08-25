import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { prisma, Listing, User, Location} from '../../models/UserModel';
import IMatchingService from '../IMatchingService';
import { PriorityQueue } from 'typescript-collections';

const googleMapsClient = new Client({});
const API_KEY = 'test';

class MatchingServiceImpl implements IMatchingService {
  async matchBeneficiaries(listing: Listing): Promise<User[]> {
    const beneficiaries = await prisma.beneficiary.findMany({
        include: { user: { include: { tags: true, location: true } } },
    });
  
    const matchScores = await Promise.all(
        beneficiaries.map(async (beneficiary) => ({
        beneficiary: beneficiary.user,
        size: await this.calculateSizeScore(listing, beneficiary.user),
        score: await this.calculateMatchScore(listing, beneficiary.user),
        }))
    );
    
    matchScores.sort((a,b) => b.score - a.score);

    const queue = new PriorityQueue<{ beneficiary: User; score: number }>(
        (a, b) => b.score - a.score
    );

    const topK: { beneficiary: User }[] = [];
    let remainingFood = listing.quantity;

    for (const match of matchScores) {
      if (remainingFood <= 0) break;
      topK.push({ beneficiary: match.beneficiary });
      queue.enqueue(match);
      remainingFood -= match.size;
    }

    // Return the beneficiaries in the order they were added to topK
    return topK.map(item => item.beneficiary);
  }

private async calculateMatchScore(listing: Listing, beneficiary: User) {
    const tagScore = await this.calculateTagScore(listing, beneficiary);
    const sizeScore = await this.calculateSizeScore(listing, beneficiary);
    const distanceScore = await this.calculateDistanceScore(listing, beneficiary);

    const tagWeight = 0.4;
    const sizeWeight = 0.4;
    const distanceWeight = 0.2;

    return (
        tagScore * tagWeight +
        sizeScore * sizeWeight +
        distanceScore * distanceWeight
    );
    
}
  private async calculateTagScore(listing: Listing, beneficiary: User): Promise<number> {
    const [listingTags, beneficiaryTags] = await Promise.all([
        prisma.tag.findMany({where: {id: listing.id}}),
        prisma.tag.findMany({where: {id: beneficiary.id}})
    ]);

  const listingTagSet = new Set(listingTags.map(tag => tag.id));
  const beneficiaryTagSet = new Set(beneficiaryTags.map(tag => tag.id));

  const matchingTagsCount = [...listingTagSet].filter(tagId => beneficiaryTagSet.has(tagId)).length;
    return matchingTagsCount / listingTagSet.size;
  }

  private async calculateSizeScore(listing: Listing, beneficiary: User): Promise<number> {
    const b = await prisma.beneficiary.findUnique({where: {userId: beneficiary.id}});
    if (b == null) {
        return 0;
    }
    return Math.min(b.size, listing.quantity) / listing.quantity;
  }

  private async calculateDistanceScore(listing: Listing, beneficiary: User): Promise<number> {
    const listingLocation = await prisma.location.findUnique({where: {id: listing.donorId}});
    const beneficiaryLocation = await prisma.location.findUnique({where: {id: beneficiary.locationId}});

    if (listingLocation == null || beneficiaryLocation == null) {
        return Infinity;
    }
    const distance = await this.getDistanceInMinutes(listingLocation, beneficiaryLocation);

    return distance;
  }

  private async getDistanceInMinutes(from: Location, to: Location): Promise<number> {
    const response = await googleMapsClient.distancematrix({
        params: {
          origins: [{ lat: from.lat, lng: from.lng }],
          destinations: [{ lat: to.lat, lng: to.lng }],
          mode: TravelMode.driving,
          key: API_KEY
        }
      });

    if (response.data.rows[0].elements[0].status !== 'OK') {
        return Infinity;
    } 

    return response.data.rows[0].elements[0].duration.value / 60;
  }

}

export default new MatchingServiceImpl();

