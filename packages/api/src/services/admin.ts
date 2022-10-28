import { User } from '@Common/models';
import { UserService } from '@Services';

export const getAllAdmins = async (): Promise<User[]> => UserService.getAll();
