import request from 'supertest';
import app from '../../app';
import { prisma } from '../models/UserModel';
import bcrypt from 'bcryptjs';

describe('User API Integration Tests', () => {

  afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM "User" where email = 'test@example.com';`;
    await prisma.$disconnect(); // Close Prisma connection
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password', role: 'donor', tags: []});

      expect(response.status).toBe(201);
      expect(response.body.email).toBe('test@example.com');
    });

    it('should handle missing email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ password: 'password', role: 'donor', tags: [] });

      expect(response.status).toBe(400);
      expect(response.text).toContain('Email is required');
    });
  });

  describe('POST /users/login', () => {
    it('should login and return a JWT token', async () => {
      const hashedPassword = await bcrypt.hash('password', 10);

      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should return 401 for invalid email', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'invalid@example.com', password: 'password' });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid email or password');
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid email or password');
    });
  });
});
