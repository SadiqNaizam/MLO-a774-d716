import React from 'react';
import { cn } from '@/lib/utils';

interface SearchMetaTextProps {
  count: number;
  itemType?: string;
  className?: string;
}

const SearchMetaText: React.FC<SearchMetaTextProps> = ({
  count,
  itemType = 'Stocks' as const,
  className,
}) => {
  return (
    <p className={cn('text-base text-foreground py-4', className)}>
      Search results <span className="font-bold text-foreground">{count.toLocaleString()}</span> {itemType}
    </p>
  );
};

export default SearchMetaText;
