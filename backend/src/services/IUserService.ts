import { UserCreateInput, User} from '../models/userModel';

interface IUserService {
    createUser(user: UserCreateInput): Promise<User>;
    updateUser(id: number, user: UserCreateInput): Promise<User | null>;
    deleteUser(id: number): Promise<User | null>;
}

export default IUserService;
