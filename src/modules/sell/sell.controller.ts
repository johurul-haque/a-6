import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as sellServices from './sell.service';
import { objectId, productSellSchema } from './sell.validation';

export const sellProduct = catchAsync(async (req, res) => {
  const productId = objectId.parse(req.params.productId);
  const payload = productSellSchema.parse(req.body);

  const data = await sellServices.sell(req.jwtPayload._id, productId, payload);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});
