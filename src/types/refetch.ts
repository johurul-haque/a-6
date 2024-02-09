import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import { Product } from './product';
import { Params } from './query-params';

export type Refetch = () => QueryActionCreatorResult<
  QueryDefinition<
    Params | undefined,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    'Products',
    Product[],
    'api'
  >
>;
