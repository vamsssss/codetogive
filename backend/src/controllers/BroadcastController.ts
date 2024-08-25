import { Request, Response } from 'express';
import IBroadcastService from '../services/IBroadcastService';

class BroadcastController {

  constructor(private broadcastService: IBroadcastService) {}

  sendBroadcast = async (req: Request, res: Response): Promise<void> => {
    try {
      const { message } = req.body;
      if (!message) {
        res.status(400).send({ error: 'Message is required' });
        return;
      }
      await this.broadcastService.sendMessage(message);
      res.status(200).send({ message: 'Broadcast sent successfully' });
    } catch (error) {
      console.error('Error in sendMessage controller:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };

  getBroadcasts = async (req: Request, res: Response): Promise<void> => {
    try {
      const broadcasts = await this.broadcastService.getBroadcasts();
      res.status(200).send(broadcasts);
    } catch (error) {
      console.error('Error in getBroadcasts controller:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
}

export default BroadcastController;