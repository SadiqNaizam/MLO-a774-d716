import React from 'react';
import { cn } from '@/lib/utils';
import TableRow, { StockData } from './TableRow';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

const dummyStockData: StockData[] = [
  {
    id: 'RELIANCE',
    companyName: 'Reliance Industries',
    chartData: [
      { name: 'Jan', value: 400 }, { name: 'Feb', value: 420 }, { name: 'Mar', value: 410 }, { name: 'Apr', value: 430 },
      { name: 'May', value: 380 }, { name: 'Jun', value: 390 }, { name: 'Jul', value: 405 }, { name: 'Aug', value: 415 },
    ],
    marketPrice: 1924.80,
    priceChange: -10.20,
    priceChangePercent: -0.53,
    closePrice: 1934.30,
    marketCap: 1226231,
  },
  {
    id: 'TCS',
    companyName: 'TCS',
    chartData: [
      { name: 'Jan', value: 300 }, { name: 'Feb', value: 280 }, { name: 'Mar', value: 290 }, { name: 'Apr', value: 270 },
      { name: 'May', value: 260 }, { name: 'Jun', value: 250 }, { name: 'Jul', value: 275 }, { name: 'Aug', value: 265 },
    ],
    marketPrice: 2184.95,
    priceChange: -35.05,
    priceChangePercent: -1.58,
    closePrice: 2219.55,
    marketCap: 832861,
  },
  {
    id: 'HDFCBANK',
    companyName: 'HDFC Bank',
    chartData: [
      { name: 'Jan', value: 500 }, { name: 'Feb', value: 510 }, { name: 'Mar', value: 490 }, { name: 'Apr', value: 520 },
      { name: 'May', value: 530 }, { name: 'Jun', value: 515 }, { name: 'Jul', value: 505 }, { name: 'Aug', value: 525 },
    ],
    marketPrice: 1056.55,
    priceChange: -23.70,
    priceChangePercent: -2.19,
    closePrice: 1080.40,
    marketCap: 593170,
  },
  {
    id: 'HINDUNILVR',
    companyName: 'Hindustan Unilever',
    chartData: [
      { name: 'Jan', value: 200 }, { name: 'Feb', value: 210 }, { name: 'Mar', value: 205 }, { name: 'Apr', value: 190 },
      { name: 'May', value: 195 }, { name: 'Jun', value: 215 }, { name: 'Jul', value: 220 }, { name: 'Aug', value: 210 },
    ],
    marketPrice: 2244.00,
    priceChange: -21.25,
    priceChangePercent: -0.94,
    closePrice: 2264.69,
    marketCap: 532100,
  },
  {
    id: 'INFY',
    companyName: 'Infosys',
    chartData: [
      { name: 'Jan', value: 150 }, { name: 'Feb', value: 160 }, { name: 'Mar', value: 140 }, { name: 'Apr', value: 130 },
      { name: 'May', value: 155 }, { name: 'Jun', value: 165 }, { name: 'Jul', value: 145 }, { name: 'Aug', value: 150 },
    ],
    marketPrice: 790.75,
    priceChange: -6.30,
    priceChangePercent: -0.79,
    closePrice: 796.70,
    marketCap: 339327,
  },
   {
    id: 'BHARTIARTL',
    companyName: 'Bharti Airtel',
    chartData: [
      { name: 'Jan', value: 80 }, { name: 'Feb', value: 90 }, { name: 'Mar', value: 110 }, { name: 'Apr', value: 100 },
      { name: 'May', value: 120 }, { name: 'Jun', value: 105 }, { name: 'Jul', value: 130 }, { name: 'Aug', value: 115 },
    ],
    marketPrice: 592.70,
    priceChange: 5.90,
    priceChangePercent: 1.01,
    closePrice: 586.75,
    marketCap: 320105,
  },
];

interface StockTableProps {
  className?: string;
}

const StockTable: React.FC<StockTableProps> = ({ className }) => {
  const [stocks, setStocks] = React.useState<StockData[]>(dummyStockData);
  // Add sorting state and logic if needed

  const TableHeaderItem: React.FC<{ title: string; sortable?: boolean; align?: 'left' | 'right' }> = 
    ({ title, sortable = false, align = 'left' }) => (
    <div className={cn(
      'py-3 px-4 text-xs font-medium text-muted-foreground flex items-center cursor-pointer',
      align === 'right' ? 'justify-end' : 'justify-start'
    )}>
      {title}
      {sortable && <ChevronDown size={14} className="ml-1" />}
    </div>
  );

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr_auto] items-center border-b border-border bg-muted/30">
        <TableHeaderItem title="COMPANY" sortable />
        <TableHeaderItem title="MARKET PRICE" align="right"/>
        <TableHeaderItem title="CLOSE PRICE" sortable align="right"/>
        <TableHeaderItem title="MARKET CAP (CR)" align="right"/>
        <div className="py-3 px-4">{/* Empty cell for add button column header */}</div>
      </div>
      <div>
        {stocks.map(stock => (
          <TableRow key={stock.id} stock={stock} />
        ))}
      </div>
    </Card>
  );
};

export default StockTable;
