import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { User } from './user.interface';
import * as userServices from './user.service';

export const registerUser = catchAsync<User>(async (req, res) => {
  const data = await userServices.create(req.body);

  sendResponse(res, {
    message: 'User created successfully',
    data,
  });
});
