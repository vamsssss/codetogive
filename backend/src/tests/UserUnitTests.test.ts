
import UserController from '../controllers/UserController';
import IUserService from '../services/IUserService';
import { Request, Response } from 'express';

// Mock UserService
const mockUserService: jest.Mocked<IUserService> = {
  createUser: jest.fn(),
  deleteUser: jest.fn(),
  getUser: jest.fn(),
  findUserByEmail: jest.fn(),
  validatePassword: jest.fn(),
  generateToken: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    userController = new UserController(mockUserService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const userData = { email: 'test@example.com', password: 'password' };
      mockRequest.body = userData;
      mockUserService.createUser.mockResolvedValue(userData as any);

      await userController.createUser(mockRequest as Request, mockResponse as Response);

      expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.send).toHaveBeenCalledWith(userData);
    });

    it('should handle errors when creating a user', async () => {
      const error = new Error('Creation failed');
      mockRequest.body = { email: 'test@example.com', password: 'password' };
      mockUserService.createUser.mockRejectedValue(error);

      await userController.createUser(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith(error.message);
    });
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const loginData = { email: 'test@example.com', password: 'password' };
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      const token = 'jwt_token';

      mockRequest.body = loginData;
      mockUserService.findUserByEmail.mockResolvedValue(user as any);
      mockUserService.validatePassword.mockResolvedValue(true);
      mockUserService.generateToken.mockResolvedValue(token);

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(loginData.email);
      expect(mockUserService.validatePassword).toHaveBeenCalledWith(loginData.password, user.password);
      expect(mockUserService.generateToken).toHaveBeenCalledWith(user);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ user, token });
    });

    it('should handle invalid email', async () => {
      mockRequest.body = { email: 'nonexistent@example.com', password: 'password' };
      mockUserService.findUserByEmail.mockResolvedValue(null);

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid email or password');
    });

    it('should handle invalid password', async () => {
      const loginData = { email: 'test@example.com', password: 'wrongpassword' };
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };

      mockRequest.body = loginData;
      mockUserService.findUserByEmail.mockResolvedValue(user as any);
      mockUserService.validatePassword.mockResolvedValue(false);

      await userController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid email or password');
    });
  });
});