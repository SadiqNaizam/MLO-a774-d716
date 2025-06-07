import React from 'react';
import TopNavBar from '../components/layout/TopNavBar';
import Sidebar from '../components/layout/Sidebar';
import SearchMetaText from '../components/Dashboard/SearchMetaText';
import StockTable from '../components/Dashboard/StockTable';
import { cn } from '@/lib/utils';

/**
 * IndexPage serves as the main entry point for the Groww Dashboard Clone,
 * showcasing the Stock Search Overview.
 * It orchestrates the layout by combining TopNavBar, Sidebar (with filters),
 * SearchMetaText, and StockTable components.
 */
const IndexPage: React.FC = () => {
  // Dummy data for SearchMetaText, as observed in the reference image.
  const searchResultCount = 3054;
  const itemTypeString = 'Stocks' as const;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation Bar - Fixed position, height h-16 (4rem) */}
      <TopNavBar />

      {/* Main content area below the fixed TopNavBar */}
      {/* pt-16 provides padding to offset the 4rem height of the TopNavBar */}
      <div className="flex flex-1 pt-16 overflow-hidden"> 
        {/* Sidebar Container */}
        {/* w-64: Fixed width for the sidebar as per layout.overall.sizing.sidebar */}
        {/* shrink-0: Prevents the sidebar from shrinking in a flex container */}
        {/* The Sidebar component itself (and SidebarFilters within it) is responsible for h-full and its own background/borders */}
        <div className={cn(
          "w-64 shrink-0"
        )}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        {/* flex-1: Allows this area to take up remaining horizontal space */}
        {/* overflow-y-auto: Enables vertical scrolling for content within this area, as per layout.overall.notes */}
        {/* bg-background: Ensures consistent background color, though body usually has this */}
        <main className={cn(
          "flex-1 overflow-y-auto bg-background"
        )}>
          {/* Inner padding for the main content, as per layout.mainContent.container */}
          <div className={cn(
            "px-6 py-8"
          )}>
            <SearchMetaText count={searchResultCount} itemType={itemTypeString} />
            <StockTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndexPage;
