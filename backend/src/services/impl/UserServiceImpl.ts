import { prisma, UserCreateInput, User } from "../../models/UserModel";
import IUserService from "../IUserService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "3lB9W!z4@R#Q%y6&V7u$2*x8(cA)dF^G7jK";

class UserServiceImpl implements IUserService {
  async createUser(data: UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const location = await prisma.location.create({
      data: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
    });

    let userData = {
      email: data.email,
      password: hashedPassword,
      tags: {
        connect: data.tags.map(tagId => ({ id: tagId })),
      },
      location: {
        connect: {id: location.id},
      },
    };

    let user: User;
    
    if (data.role === 'donor') {
      user = await prisma.user.create({
        data: {
          ...userData,
          donor: {create: {}},
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          ...userData,
          beneficiary: {
            create: {
              size: data.size,
            }
          },
        },
      });
    }
    return user;
  }

  async deleteUser(id: number): Promise<User | null> {
    return await prisma.user.delete({
      where: { id },
    });
  }

  async getUser(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    // Implement this method to find a user by email
    return await prisma.user.findUnique({ where: { email } });
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async generateToken(user: User): Promise<string> {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}

export default new UserServiceImpl();

