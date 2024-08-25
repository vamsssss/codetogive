import IBroadcastService from '../../services/IBroadcastService';
import { Broadcast, prisma } from '../../models/BroadcastModel';


class TelegramBroadcastServiceImpl implements IBroadcastService {

  async sendMessage(message: string): Promise<void> {
    // Store message in database
    await prisma.broadcast.create({
    data: {
        message,
    },
    });
  }

  async getBroadcasts(): Promise<Broadcast[]> {
    const broadcasts = await prisma.broadcast.findMany({
    orderBy: {
        createdAt: 'desc',
    },
    });
    return broadcasts;
  }
}

export default new TelegramBroadcastServiceImpl();