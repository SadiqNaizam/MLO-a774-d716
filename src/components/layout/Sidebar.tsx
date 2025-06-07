import React from 'react';
import { cn } from '@/lib/utils';
import SidebarFilters from '../Dashboard/SidebarFilters';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  // The SidebarFilters component is self-contained regarding its width (w-64),
  // height (h-full), background, text color, and border.
  // This Sidebar layout component acts as a structural container within the DashboardLayout's grid.
  // It passes through any additional class names for layout-specific adjustments.
  return (
    <aside className={cn("h-full", className)}>
      <SidebarFilters />
    </aside>
  );
};

export default Sidebar;
