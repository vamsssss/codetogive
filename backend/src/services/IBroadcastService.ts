import { Broadcast } from "../models/BroadcastModel";

interface IBroadcastService {
    sendMessage(message: string): Promise<void>;
    getBroadcasts(): Promise<Broadcast[]>;
}
  
export default IBroadcastService;