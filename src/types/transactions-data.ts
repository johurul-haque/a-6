export type TransactionsData = {
  _id: string;
  productId: {
    name: string;
    price: number;
  };
  buyer_name: string;
  sold_on: string;
  quantity_sold: number;
  total_sale: number;
};
