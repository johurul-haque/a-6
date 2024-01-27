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
  const { token } = await userServices.login(req.body);

  res.cookie('token', token, {
    httpOnly: true,
  });

  return sendResponse(res, {
    message: 'Login successful',
  });
});
