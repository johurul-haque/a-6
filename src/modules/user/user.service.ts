import { User } from './user.interface';
import { UserModel } from './user.model';

export async function create(payload: User) {
  return UserModel.create(payload);
}
