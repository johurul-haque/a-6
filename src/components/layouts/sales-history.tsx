import * as D from '@/components/ui/dialog';
import { formatCurrency } from '@/lib/format-currency';
import { useSalesHistoryQuery } from '@/redux/api/sales';
import { HistoryIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const categorizeByOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

export function SalesHistory() {
  const [categorizeBy, setCategorizeBy] = useState('monthly');
  const { data } = useSalesHistoryQuery(categorizeBy.toLowerCase());

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
            Sales History <Badge className="capitalize">{categorizeBy}</Badge>
          </D.DialogTitle>
          <div className="w-36">
            <Select onValueChange={setCategorizeBy}>
              <SelectTrigger className="font-normal h-9">
                <SelectValue placeholder="Categorize by" />
              </SelectTrigger>
              <SelectContent>
                {categorizeByOptions.map((label) => (
                  <SelectItem key={label} value={label}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </D.DialogHeader>

        {!data || data.length < 2 ? (
          <p className="text-center sm:text-lg -mt-5">
            Not enough data to display
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="_id"
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
              <Tooltip formatter={formatCurrency} />
              <Bar
                dataKey="total_sales"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </D.DialogContent>
    </D.Dialog>
  );
}
