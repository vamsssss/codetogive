import { prisma, UserCreateInput, User } from '../../models/userModel';
import IUserService from '../IUserService';

class UserServiceImpl implements IUserService {
    async createUser(data: UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                role: data.role,
                size: data.size,
                password: data.password,
                tags: {
                    connect: data.tags
                }
            }
        });
    }

    async updateUser(id: number, data: UserCreateInput): Promise<User | null> {
        return await prisma.user.update({
            where: { id },
            data: {
                email: data.email,
                name: data.name,
                role: data.role,
                size: data.size,
                tags: {
                    connect: data.tags
                }
            }
        });
    }

    async deleteUser(id: number): Promise<User | null> {
        return await prisma.user.delete({
            where: { id }
        });
    }
}

export default new UserServiceImpl();
