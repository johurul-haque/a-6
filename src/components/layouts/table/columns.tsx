import { ColumnDef } from '@tanstack/react-table';

import { Product } from '@/types/product';
import { SellProduct } from '../sell-product';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { frameMaterials } from './data/data';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[250px] truncate font-medium">
          {row.getValue('name')}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return <>{'$ ' + row.getValue('price')}</>;
    },
    filterFn: (row, id, value) => {
      return Number(row.getValue(id)) >= Number(value);
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      return <>{row.getValue('quantity')}</>;
    },
    filterFn: (row, id, value) => {
      return Number(row.getValue(id)) >= Number(value);
    },
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
    cell: ({ row }) => {
      return <>{row.getValue('brand')}</>;
    },
  },
  {
    accessorKey: 'frame.material',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Material" />
    ),
    cell: (row) => {
      const frameMaterial = frameMaterials.find(
        (material) => material === row.getValue()
      );

      if (!frameMaterial) {
        return null;
      }

      return <>{row.getValue()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'frame.shape',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Shape" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
  },
  {
    accessorKey: 'lens_type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lens Type" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-center"
        column={column}
        title="Actions"
      />
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-3">
        <SellProduct />
        <DataTableRowActions row={row} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
