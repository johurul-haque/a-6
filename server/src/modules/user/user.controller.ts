import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { LoginPayload, User } from './user.interface';
import * as userServices from './user.service';

export const registerUser = catchAsync<User>(async (req, res) => {
  return sendResponse(res, {
    status: 403,
    message: "Project has been archived. New user can't be created.",
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

  return sendResponse(res, {
    message: 'Logout successful.',
    data,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  return sendResponse(res, {
    status: 403,
    message: "Project has been archived. Demo users can't be deleted.",
  });
});