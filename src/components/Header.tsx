import { MoreVertical, History, Sparkles, Zap } from 'lucide-react';
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
          brandClass: 'bg-birthday-primary/30 border-birthday-accent/40 text-birthday-text shadow-lg shadow-birthday-primary/20',
          titleClass: 'text-birthday-text drop-shadow-lg sparkle-animation',
        };
      case 'anniversary':
        return {
          title: 'Anniversary Wishes',
          subtitle: 'Celebrate love and beautiful journeys',
          icon: '💕',
          brandClass: 'bg-anniversary-primary/30 border-anniversary-accent/40 text-anniversary-text shadow-lg shadow-anniversary-primary/20',
          titleClass: 'text-anniversary-text drop-shadow-lg sparkle-animation',
        };
      case 'tribute':
        return {
          title: 'Memorial Tribute',
          subtitle: 'Honor memories with heartfelt messages',
          icon: '🕯️',
          brandClass: 'bg-tribute-accent/30 border-tribute-accent/40 text-tribute-text shadow-lg shadow-tribute-accent/20',
          titleClass: 'text-tribute-text drop-shadow-lg',
        };
    }
  };

  const config = getTitleConfig();

  return (
    <div className="fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-b border-white/10 p-4 z-20">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Auto Whisher Brand Box */}
        <div className={`px-3 py-2 rounded-xl border-2 backdrop-blur-sm float-gentle ${config.brandClass}`}>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 sparkle-animation" />
            <span className="font-bold text-xs tracking-wider">AUTO WHISHER</span>
            <Sparkles className="w-3 h-3 pulse-celebrate" />
          </div>
        </div>

        {/* Center Title */}
        <div className="flex items-center gap-2">
          <div className="text-2xl float-gentle">{config.icon}</div>
          <div className="text-center">
            <h1 className={`text-sm font-bold ${config.titleClass}`}>
              {config.title}
            </h1>
          </div>
        </div>
        
        {/* Menu Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl backdrop-blur glow-effect"
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