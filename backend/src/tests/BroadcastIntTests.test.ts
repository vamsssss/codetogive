import request from 'supertest';
import { prisma } from '../models/BroadcastModel';
import app from '../../app';

describe('Broadcast Integration Tests', () => {

  afterAll(async () => {
    await prisma.broadcast.deleteMany();
    await prisma.$disconnect();
  });

  it('should send a broadcast message', async () => {
    const response = await request(app)
      .post('/api/broadcast/sendBroadcast')
      .send({ message: 'Test broadcast message' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Broadcast sent successfully' });

    // Verify the message was stored in the database
    const storedBroadcast = await prisma.broadcast.findFirst({
      where: { message: 'Test broadcast message' },
    });
    expect(storedBroadcast).toBeTruthy();
  });

  it('should return 400 if message is missing', async () => {
    const response = await request(app)
      .post('/api/broadcast/sendBroadcast')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Message is required' });
  });

  it('should get all broadcasts', async () => {
    // Add a few test broadcasts
    await prisma.broadcast.createMany({
      data: [
        { message: 'Test message 1' },
        { message: 'Test message 2' },
        { message: 'Test message 3' },
      ],
    });

    const response = await request(app).get('/api/broadcast/getBroadcasts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4); // 3 new + 1 from previous test
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('message');
    expect(response.body[0]).toHaveProperty('createdAt');
  });
});