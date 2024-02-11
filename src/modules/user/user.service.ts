import { env } from '@/config';
import { AppError } from '@/utils';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types, startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { ProductSaleModel } from '../sales/sales.model';
import {
  DeleteAccountPayload,
  LoginPayload,
  LogoutPayload,
  TJwtPayload,
  User,
} from './user.interface';
import { UserModel } from './user.model';

export async function create(payload: User) {
  const user = await UserModel.create(payload);

  const token = jwt.sign({ _id: user._id }, env.JWT_SECRET, {
    expiresIn: '15d',
  });

  return { user, token };
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

export async function logout(payload: LogoutPayload) {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) throw new AppError(404, 'User does not exist.');

  return user;
}

export async function deleteAccount(
  payload: DeleteAccountPayload,
  userId: Types.ObjectId
) {
  const user = await UserModel.findById(userId);

  if (!user) throw new AppError(404, 'User does not exist.');

  const isMatched = await compare(payload.password, user.password);

  if (!isMatched) throw new AppError(401, 'Password does not match.');

  const session = await startSession();

  try {
    session.startTransaction();

    await ProductModel.deleteMany({ userId: user._id });
    await ProductSaleModel.deleteMany({ userId: user._id });
    await UserModel.findByIdAndDelete(user._id);

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
  }

  return user;
}