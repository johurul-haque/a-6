import { Product } from '@/types/product';
import { Row } from '@tanstack/react-table';

export function regexSearch(row: Row<Product>, id: string, value: any) {
  const regex = new RegExp(value, 'i');
  
  return regex.test(row.getValue(id));
}
