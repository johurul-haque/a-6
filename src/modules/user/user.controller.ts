import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { LoginPayload, User } from './user.interface';
import * as userServices from './user.service';

export const registerUser = catchAsync<User>(async (req, res) => {
  const data = await userServices.create(req.body);

  return sendResponse(res, {
    status: 201,
    message: 'User created successfully',
    data,
  });
});

export const loginUser = catchAsync<LoginPayload>(async (req, res) => {
  const data = await userServices.login(req.body);

  return sendResponse(res, {
    message: 'Login successful',
    data,
  });
});

export const getUserData = catchAsync(async (req, res) => {
  const data = await userServices.getUser(req.jwtPayload);

  return sendResponse(res, {
    message: 'User data retrieved successfully',
    data,
  });
});

export const logoutUser = catchAsync(async (req, res) => {
  const data = await userServices.logout(req.body);

  res.clearCookie('token');

  return sendResponse(res, {
    message: 'Logout successful.',
    data,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const data = await userServices.deleteAccount(req.body, req.jwtPayload._id);

  res.clearCookie('token');

  return sendResponse(res, {
    message: 'User deleted successfully.',
    data,
  });
});