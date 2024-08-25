import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { Listing, User, Beneficiary, Tag, Location} from '../../models/UserModel';
import IMatchingService from '../IMatchingService';

const googleMapsClient = new Client({});
const API_KEY = 'test';

// class MatchingServiceImpl implements IMatchingService {
//   async matchBeneficiaries(listing: Listing, beneficiaries: Beneficiary[]): Promise<Beneficiary[]> {
//     const matches = await Promise.all(beneficiaries.map(async (beneficiary) => {
//       const tagScore = this.calculateTagScore(listing.tags, beneficiary.tags);
//       const sizeScore = this.calculateSizeScore(listing.estimatedFoodCount, beneficiary.size);
//       const distanceScore = await this.calculateDistanceScore(listing.location, beneficiary.location);
//       const totalScore = this.calculateTotalScore(tagScore, sizeScore, distanceScore);
//       return { beneficiary, score: totalScore };
//     }));

//     matches.sort((a, b) => b.score - a.score);

//     const topK: { beneficiary: Beneficiary }[] = [];
//     let remainingFood = listing.estimatedFoodCount;
//     for (const match of matches) {
//       if (remainingFood <= 0) break;
//       topK.push(match);
//       remainingFood -= match.beneficiary.size;
//     }
//     return ;
//   }

//   private calculateTagScore(listingTags: Tag[], beneficiaryTags: Tag[]): number {
//     const matchingTags = beneficiaryTags.filter(tag => listingTags.includes(tag));
//     return matchingTags.length / listingTags.length;
//   }

//   private calculateSizeScore(estimatedFoodCount: number, beneficiarySize: number): number {
//     return Math.min(beneficiarySize, estimatedFoodCount) / estimatedFoodCount;
//   }

//   private async calculateDistanceScore(listingLocation: Location, beneficiaryLocation: Location): Promise<number> {
//     const distance = await this.getDistanceInMinutes(listingLocation, beneficiaryLocation);
//     return 1 / (distance + 1);
//   }

//   private calculateTotalScore(tagScore: number, sizeScore: number, distanceScore: number): number {
//     return 0.5 * tagScore + 0.3 * sizeScore + 0.2 * distanceScore;
//   }

//   async getDistanceInMinutes(from: Location, to: Location): Promise<number> {
//     const response = await googleMapsClient.distancematrix({
//         params: {
//           origins: [{ lat: from.lat, lng: from.lng }],
//           destinations: [{ lat: to.lat, lng: to.lng }],
//           mode: TravelMode.driving,
//           key: API_KEY
//         }
//       });

//     if (response.data.rows[0].elements[0].status !== 'OK') {
//         return Infinity;
//     } 

//     return response.data.rows[0].elements[0].duration.value / 60;
//   }

// }

// export {MatchingServiceImpl}