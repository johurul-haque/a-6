import { env } from '@/config';
import { AppError } from '@/utils';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginPayload, TJwtPayload, User } from './user.interface';
import { UserModel } from './user.model';

export async function create(payload: User) {
  const user = await UserModel.create(payload);

  const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return {user, token};

}

export async function login(payload: LoginPayload) {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) throw new AppError(404, 'User is not registered.');

  const isMatched = await compare(payload.password, user.password);

  if (!isMatched) throw new AppError(401, 'Password does not match.');

  const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return {
    user,
    token,
  };
}

export async function getUser(payload: TJwtPayload) {
  const user = await UserModel.findById(payload._id);

  if (!user) throw new AppError(404, 'User does not exist.');

  return user;
}

export async function logout(payload: TJwtPayload) {
  const user = await UserModel.findByIdAndDelete(payload._id);

  if (!user) throw new AppError(404, 'User does not exist.');
}