import React from 'react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
  <AccordionItem value={title.toLowerCase()} className="border-b border-border">
    <AccordionTrigger className="py-3 px-4 text-sm font-medium hover:no-underline text-sidebar-foreground">
      {title}
    </AccordionTrigger>
    <AccordionContent className="px-4 pb-4 space-y-4">
      {children}
    </AccordionContent>
  </AccordionItem>
);

const SidebarFilters: React.FC = () => {
  const [marketCapRange, setMarketCapRange] = React.useState<[number, number]>([0, 2000000]);
  const [marketCapMinInput, setMarketCapMinInput] = React.useState<string>('0');
  const [marketCapMaxInput, setMarketCapMaxInput] = React.useState<string>('100000000');

  const [closingPriceRange, setClosingPriceRange] = React.useState<[number, number]>([0, 5000]);
  const [closingPriceMinInput, setClosingPriceMinInput] = React.useState<string>('0');
  const [closingPriceMaxInput, setClosingPriceMaxInput] = React.useState<string>('10000');

  const sectors = ["Technology", "Healthcare", "Finance", "Consumer Goods", "Industrials", "Real Estate", "Energy"] as const;
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([]);

  const indices = ["Nifty 50", "Sensex", "Nifty Bank", "Nifty IT", "Nifty Next 50"] as const;
  const [selectedIndices, setSelectedIndices] = React.useState<string[]>([]);

  const handleCheckboxChange = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    currentSelected: string[]
  ) => {
    setter(currentSelected.includes(item) ? currentSelected.filter(s => s !== item) : [...currentSelected, item]);
  };

  const handleMarketCapButtonClick = (type: 'Small' | 'Mid' | 'Large') => {
    let min = 0, max = 2000000; // Default max for slider
    let minInput = '0', maxInput = '100000000';

    if (type === 'Small') { min = 0; max = 5000; minInput = '0'; maxInput = '5000'; }
    if (type === 'Mid') { min = 5000; max = 20000; minInput = '5000'; maxInput = '20000'; }
    if (type === 'Large') { min = 20000; max = 2000000; minInput = '20000'; maxInput = '100000000';} // Slider max is 20L Cr, input max is higher
    
    setMarketCapRange([min, Math.min(max, 2000000)]); // Ensure slider values are within its bounds
    setMarketCapMinInput(minInput);
    setMarketCapMaxInput(maxInput);
  };

  const handleClearAll = () => {
    setSelectedSectors([]);
    setSelectedIndices([]);
    setMarketCapRange([0, 2000000]);
    setMarketCapMinInput('0');
    setMarketCapMaxInput('100000000');
    setClosingPriceRange([0, 5000]);
    setClosingPriceMinInput('0');
    setClosingPriceMaxInput('10000');
  };

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground w-64 border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-semibold text-muted-foreground tracking-wider">FILTERS</h2>
          <Button variant="link" className="text-primary p-0 h-auto text-xs font-medium" onClick={handleClearAll}>CLEAR ALL</Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="multiple" defaultValue={['sector', 'index', 'market cap (cr)', 'closing price']} className="w-full">
          <FilterSection title="Sector">
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {sectors.map(sector => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox id={`sector-${sector}`} onCheckedChange={() => handleCheckboxChange(sector, setSelectedSectors, selectedSectors)} checked={selectedSectors.includes(sector)} className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"/>
                  <Label htmlFor={`sector-${sector}`} className="text-sm font-normal text-sidebar-foreground cursor-pointer">{sector}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Index">
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {indices.map(index => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`index-${index}`} onCheckedChange={() => handleCheckboxChange(index, setSelectedIndices, selectedIndices)} checked={selectedIndices.includes(index)} className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"/>
                  <Label htmlFor={`index-${index}`} className="text-sm font-normal text-sidebar-foreground cursor-pointer">{index}</Label>
                </div>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Market Cap (Cr)">
            <Slider
              value={marketCapRange}
              onValueChange={setMarketCapRange}
              max={2000000} // 20 Lakh Cr
              step={1000}
              className="my-4 [&>span:first-child]:h-1.5 [&>span:first-child>span]:bg-primary [&_.thumb-class]:bg-primary"
            />
            <div className="flex items-center justify-between space-x-2 text-xs">
              <Input type="number" value={marketCapMinInput} onChange={(e) => setMarketCapMinInput(e.target.value)} className="w-1/2 h-8 text-xs bg-background border-border" placeholder="0" />
              <span className="text-muted-foreground">to</span>
              <Input type="number" value={marketCapMaxInput} onChange={(e) => setMarketCapMaxInput(e.target.value)} className="w-1/2 h-8 text-xs bg-background border-border" placeholder="100000000" />
            </div>
            <div className="flex justify-between mt-3 space-x-1">
              {(['Small', 'Mid', 'Large'] as const).map(type => (
                <Button key={type} variant="outline" size="sm" className="text-xs h-7 flex-1 bg-background border-border hover:bg-secondary hover:border-primary text-sidebar-foreground" onClick={() => handleMarketCapButtonClick(type)}>
                  {type}
                </Button>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Closing Price">
            <Slider
              value={closingPriceRange}
              onValueChange={setClosingPriceRange}
              max={10000}
              step={10}
              className="my-4 [&>span:first-child]:h-1.5 [&>span:first-child>span]:bg-primary [&_.thumb-class]:bg-primary"
            />
            <div className="flex items-center justify-between space-x-2 text-xs">
              <Input type="number" value={closingPriceMinInput} onChange={(e) => setClosingPriceMinInput(e.target.value)} className="w-1/2 h-8 text-xs bg-background border-border" placeholder="0" />
              <span className="text-muted-foreground">to</span>
              <Input type="number" value={closingPriceMaxInput} onChange={(e) => setClosingPriceMaxInput(e.target.value)} className="w-1/2 h-8 text-xs bg-background border-border" placeholder="10000" />
            </div>
          </FilterSection>
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default SidebarFilters;
