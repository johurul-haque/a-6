import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { z } from 'zod';
import { categorizeBy } from './sales.constants';
import * as sellServices from './sales.service';

export const sellProduct = catchAsync(async (req, res) => {
  const data = await sellServices.sell(req.jwtPayload._id, req.body);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});

export const getSalesHistory = catchAsync(async (req, res) => {
  const categorize_by = z.enum(categorizeBy).parse(req.query.categorize_by);

  const data = await sellServices.salesHistory(
    req.jwtPayload._id,
    categorize_by
  );

  sendResponse(res, {
    message: 'Successfully retrieved sales history',
    data,
  });
});