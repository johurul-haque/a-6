import * as D from '@/components/ui/dialog';
import { HistoryIcon } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 500) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 500) + 1000,
  },
];

const tabs = [
  {
    label: 'Daily',
    handler: () => {},
  },
  {
    label: 'Weekly',
    handler: () => {},
  },
  {
    label: 'Monthly',
    handler: () => {},
  },
  {
    label: 'Yearly',
    handler: () => {},
  },
];

export function SalesHistory() {
  const [salesIn, setSalesIn] = useState('Weekly');

  return (
    <D.Dialog>
      <D.DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden h-8 lg:flex border-dashed"
        >
          <HistoryIcon className="mr-2 size-4" />
          Sales History
        </Button>
      </D.DialogTrigger>
      <D.DialogContent className="md:max-w-[900px] overflow-y-auto max-h-[94svh]">
        <D.DialogHeader className="mb-8 mt-2 flex flex-row justify-between items-center">
          <D.DialogTitle className="flex items-center gap-2">
            <HistoryIcon className="size-5" />
            Sales History <Badge className="capitalize">{salesIn}</Badge>
          </D.DialogTitle>
          <div className="w-36">
            <Select onValueChange={setSalesIn}>
              <SelectTrigger className="font-normal h-9">
                <SelectValue placeholder="Categorize by" />
              </SelectTrigger>
              <SelectContent defaultValue={'weekly'}>
                {tabs.map(({ label, handler }) => (
                  <SelectItem key={label} value={label.toLowerCase()}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </D.DialogHeader>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </D.DialogContent>
    </D.Dialog>
  );
}
