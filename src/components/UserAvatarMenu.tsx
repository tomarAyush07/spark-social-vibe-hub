import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';
import { toast } from './ui/use-toast';

export const UserAvatarMenu: React.FC<{ user?: { name: string; email: string; gender?: string; avatar?: string } | null }> = ({ user }) => {
  // Use user's avatar if available, otherwise show initial
  const avatar = user && 'avatar' in user && user.avatar ? user.avatar : undefined;
  const fallback = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="w-9 h-9 border-2 border-indigo-400 shadow-md">
            {avatar && <AvatarImage src={avatar} alt="User avatar" />}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 mt-2">
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={() => toast({ title: 'Logged out', description: 'You have been logged out.' })}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}; 