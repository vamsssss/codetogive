import { UserCreateInput, User } from "../models/UserModel";

interface IUserService {
  createUser(user: UserCreateInput): Promise<User>;
  updateUser(id: number, user: UserCreateInput): Promise<User | null>;
  deleteUser(id: number): Promise<User | null>;
  getUser(id: number): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  generateToken(user: User): Promise<string>;
}

export default IUserService;
