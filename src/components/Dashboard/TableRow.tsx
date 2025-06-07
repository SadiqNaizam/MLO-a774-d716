import React from 'react';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface StockData {
  id: string;
  companyName: string;
  logoUrl?: string;
  chartData: { name: string; value: number }[];
  marketPrice: number;
  priceChange: number;
  priceChangePercent: number;
  closePrice: number;
  marketCap: number;
}

interface TableRowProps {
  stock: StockData;
  className?: string;
}

const TableRow: React.FC<TableRowProps> = ({ stock, className }) => {
  const priceChangeColor = stock.priceChange > 0 ? 'text-primary' : stock.priceChange < 0 ? 'text-destructive' : 'text-muted-foreground';
  const chartLineColor = stock.priceChange > 0 ? 'hsl(var(--primary))' : stock.priceChange < 0 ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))';

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };
  
  const minChartValue = Math.min(...stock.chartData.map(d => d.value)) * 0.95;
  const maxChartValue = Math.max(...stock.chartData.map(d => d.value)) * 1.05;

  return (
    <div className={cn(
      "grid grid-cols-[2fr_1fr_1fr_1.2fr_auto] items-center border-b border-border hover:bg-secondary/30 transition-colors duration-150",
      className
    )}>
      {/* Company Name and Chart */}
      <div className="py-4 px-4 flex items-center space-x-3">
        {/* Optional: Add stock.logoUrl if available */}
        {/* <img src={stock.logoUrl} alt={stock.companyName} className="h-8 w-8 rounded-full" /> */}
        <div className="flex-grow">
          <p className="text-sm font-medium text-foreground truncate">{stock.companyName}</p>
        </div>
        <div className="w-20 h-8 ml-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stock.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <YAxis domain={[minChartValue, maxChartValue]} hide={true} />
              <Line type="monotone" dataKey="value" stroke={chartLineColor} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Price */}
      <div className="py-4 px-4 text-right">
        <p className="text-sm font-medium text-foreground">{formatCurrency(stock.marketPrice)}</p>
        <p className={cn("text-xs", priceChangeColor)}>
          {stock.priceChange.toFixed(2)} ({stock.priceChangePercent.toFixed(2)}%)
        </p>
      </div>

      {/* Close Price */}
      <div className="py-4 px-4 text-right">
        <p className="text-sm text-foreground">{formatCurrency(stock.closePrice)}</p>
      </div>

      {/* Market Cap */}
      <div className="py-4 px-4 text-right">
        <p className="text-sm text-foreground">{formatMarketCap(stock.marketCap)}</p>
      </div>
      
      {/* Add Button */}
      <div className="py-4 px-4 flex justify-center items-center">
        <Button variant="ghost" size="icon" className="text-primary/70 hover:text-primary rounded-full w-7 h-7">
          <PlusCircle size={20} />
        </Button>
      </div>
    </div>
  );
};

export default TableRow;
