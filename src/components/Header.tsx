import { MoreVertical, History, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { WishType } from './WishForm';

interface HeaderProps {
  currentType: WishType;
  onShowHistory: () => void;
}

const Header = ({ currentType, onShowHistory }: HeaderProps) => {
  const getTitleConfig = () => {
    switch (currentType) {
      case 'birthday':
        return {
          title: 'Birthday Wishes',
          subtitle: 'Spread joy and celebrate special moments',
          icon: '🎂',
        };
      case 'anniversary':
        return {
          title: 'Anniversary Wishes',
          subtitle: 'Celebrate love and beautiful journeys',
          icon: '💕',
        };
      case 'tribute':
        return {
          title: 'Memorial Tribute',
          subtitle: 'Honor memories with heartfelt messages',
          icon: '🕯️',
        };
    }
  };

  const config = getTitleConfig();

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-b border-white/10 p-4 z-20">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{config.icon}</div>
          <div>
            <h1 className="text-lg font-bold text-white drop-shadow-lg">
              {config.title}
            </h1>
            <p className="text-sm text-white/80 drop-shadow">
              {config.subtitle}
            </p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl backdrop-blur"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-white/90 backdrop-blur-lg border-white/20 rounded-xl shadow-xl"
          >
            <DropdownMenuItem 
              onClick={onShowHistory}
              className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-black/5"
            >
              <History className="w-4 h-4" />
              <span className="font-medium">View History</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 py-3 px-4 cursor-pointer hover:bg-black/5">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;