import { Button } from '@/components/ui/button';
import { Cake, Heart, Flame } from 'lucide-react';
import { WishType } from './WishForm';

interface NavigationProps {
  currentType: WishType;
  onTypeChange: (type: WishType) => void;
}

const Navigation = ({ currentType, onTypeChange }: NavigationProps) => {
  const navItems = [
    {
      type: 'birthday' as WishType,
      icon: <Cake className="w-5 h-5" />,
      label: 'Birthday',
      activeClass: 'bg-birthday-primary text-white shadow-lg shadow-birthday-primary/30',
      inactiveClass: 'bg-white/20 text-current hover:bg-white/30',
    },
    {
      type: 'anniversary' as WishType,
      icon: <Heart className="w-5 h-5" />,
      label: 'Anniversary',
      activeClass: 'bg-anniversary-primary text-white shadow-lg shadow-anniversary-primary/30',
      inactiveClass: 'bg-white/20 text-current hover:bg-white/30',
    },
    {
      type: 'tribute' as WishType,
      icon: <Flame className="w-5 h-5" />,
      label: 'Tribute',
      activeClass: 'bg-tribute-accent text-tribute-background shadow-lg shadow-tribute-accent/30',
      inactiveClass: 'bg-white/10 text-current hover:bg-white/20',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10 p-4 z-20">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {navItems.map((item) => (
            <Button
              key={item.type}
              onClick={() => onTypeChange(item.type)}
              className={`py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                currentType === item.type ? item.activeClass : item.inactiveClass
              }`}
              variant="ghost"
            >
              <div className="flex flex-col items-center gap-1">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;