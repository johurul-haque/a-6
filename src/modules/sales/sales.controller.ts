import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as sellServices from './sales.service';
import { objectId, productSaleSchema } from './sales.validation';

export const sellProduct = catchAsync(async (req, res) => {
  const productId = objectId.parse(req.params.productId);
  const payload = productSaleSchema.parse(req.body);

  const data = await sellServices.sell(req.jwtPayload._id, productId, payload);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});
