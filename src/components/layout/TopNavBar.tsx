import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PieChart, Search, Bell, Briefcase } from 'lucide-react';

interface TopNavBarProps {
  className?: string;
}

const navItems = [
  { label: "Explore" as const, href: "#" },
  { label: "Investments" as const, href: "#" },
] as const;

const TopNavBar: React.FC<TopNavBarProps> = ({ className }) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 bg-card shadow-header",
        "flex items-center justify-between px-4 sm:px-6",
        className
      )}
    >
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center space-x-6 md:space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer">
          <PieChart className="h-7 w-7 text-primary" /> 
          <span className="font-bold text-xl text-foreground">Groww</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md lg:max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search mutual funds and stocks"
            className="w-full h-10 pl-10 pr-3 rounded-md bg-muted border-border focus:border-primary focus:bg-background transition-colors"
          />
        </div>
      </div>

      {/* Right Section: Action Icons and User Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full w-9 h-9">
          <Bell size={20} />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full w-9 h-9">
          <Briefcase size={20} />
          <span className="sr-only">Portfolio</span>
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://i.pravatar.cc/40?u=growwuser" alt="User Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default TopNavBar;
