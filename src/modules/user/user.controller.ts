import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { setCookie } from '@/utils/set-cookie';
import { LoginPayload, User } from './user.interface';
import * as userServices from './user.service';

export const registerUser = catchAsync<User>(async (req, res) => {
  const { user, token } = await userServices.create(req.body);

  setCookie(res, token);

  return sendResponse(res, {
    status: 201,
    message: 'User created successfully',
    data: user,
  });
});

export const loginUser = catchAsync<LoginPayload>(async (req, res) => {
  const { token, user } = await userServices.login(req.body);

  setCookie(res, token);

  return sendResponse(res, {
    message: 'Login successful',
    data: user,
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
  res.clearCookie('token');

  return sendResponse(res, {
    message: 'Logout successful.',
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userServices.logout(req.jwtPayload);

  res.clearCookie('token');

  return sendResponse(res, {
    message: 'User deleted successfully.',
  });
});