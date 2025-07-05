import React from 'react';
import { Switch } from './ui/switch';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const handleToggle = () => {
    toggleTheme();
    toast({
      title: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      description: `The app is now in ${theme === 'light' ? 'dark' : 'light'} mode.`,
    });
  };
  return (
    <div className="flex items-center gap-2">
      <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-yellow-500' : 'text-gray-400'}`} />
      <Switch checked={theme === 'dark'} onCheckedChange={handleToggle} />
      <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-500' : 'text-gray-400'}`} />
    </div>
  );
}; 