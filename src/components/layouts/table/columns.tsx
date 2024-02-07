import { regexSearch } from '@/lib/regex-search';
import { Product } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';
import { SellProduct } from '../sell-product';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Product>[] = [
  {
    id: 'actions',
    header: () => (
      <div className="whitespace-nowrap flex items-center justify-center gap-3">
        Actions
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-3">
        <DataTableRowActions row={row} />
        <SellProduct />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
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
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="min-w-28"
        column={column}
        title="Brand"
      />
    ),
    cell: ({ row }) => {
      return <>{row.getValue('brand')}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
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
      return row.getValue<number>(id) >= Number(value);
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-w-fit mx-auto"
        column={column}
        title="Quantity"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center max-w-fit mx-auto">
          {row.getValue('quantity')}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.getValue<number>(id) >= Number(value);
    },
  },
  {
    accessorKey: 'frame.material',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Material" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'frame.shape',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frame Shape" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
    filterFn: regexSearch,
  },
  {
    accessorKey: 'lens_type',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lens Type" />
    ),
    cell: ({ row }) => {
      return <div className="min-w-24">{row.getValue('lens_type')}</div>;
    },
    filterFn: regexSearch,
  },
  {
    accessorKey: 'color',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'temple_length',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-w-fit mx-auto"
        column={column}
        title="Temple Length"
      />
    ),
    cell: (row) => {
      return <>{row.getValue() + ' mm'}</>;
    },
    filterFn: (row, id, value) => {
      return row.getValue<number>(id) >= Number(value);
    },
  },
  {
    accessorKey: 'bridge_size',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-w-fit mx-auto"
        column={column}
        title="Bridge Size"
      />
    ),
    cell: (row) => {
      return <>{row.getValue() + ' mm'}</>;
    },
    filterFn: (row, id, value) => {
      return row.getValue<number>(id) >= Number(value);
    },
  },
  {
    accessorKey: 'hinge_type',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="max-w-fit mx-auto"
        column={column}
        title="Hinge Type"
      />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'gender',
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: (row) => {
      return <>{row.getValue()}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
