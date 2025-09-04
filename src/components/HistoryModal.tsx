import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { WishData } from './WishForm';
import { Calendar, Phone, MessageSquare, Cake, Heart, Flame } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: WishData[];
}

const HistoryModal = ({ isOpen, onClose, history }: HistoryModalProps) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'birthday':
        return {
          icon: <Cake className="w-4 h-4" />,
          label: 'Birthday',
          badgeClass: 'bg-birthday-primary text-white',
          emoji: '🎂',
        };
      case 'anniversary':
        return {
          icon: <Heart className="w-4 h-4" />,
          label: 'Anniversary',
          badgeClass: 'bg-anniversary-primary text-white',
          emoji: '💕',
        };
      case 'tribute':
        return {
          icon: <Flame className="w-4 h-4" />,
          label: 'Memorial',
          badgeClass: 'bg-tribute-accent text-tribute-background',
          emoji: '🕯️',
        };
      default:
        return {
          icon: <MessageSquare className="w-4 h-4" />,
          label: 'Message',
          badgeClass: 'bg-gray-500 text-white',
          emoji: '📨',
        };
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStats = () => {
    const stats = history.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      acc.total = (acc.total || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return stats;
  };

  const stats = getStats();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white/95 backdrop-blur-lg border-white/20 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold">
            📊 Wish History
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Stats Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Total Sent</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{stats.total || 0}</div>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              {['birthday', 'anniversary', 'tribute'].map((type) => {
                const config = getTypeConfig(type);
                const count = stats[type] || 0;
                return (
                  <div key={type} className="flex items-center justify-between bg-white/50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{config.emoji}</span>
                      <span className="text-sm font-medium">{config.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {count}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History List */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Recent Messages</h3>
            <ScrollArea className="h-64">
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No messages sent yet</p>
                  <p className="text-sm">Start spreading joy!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((item, index) => {
                      const config = getTypeConfig(item.type);
                      return (
                        <Card key={index} className="bg-white/60 hover:bg-white/80 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge className={`${config.badgeClass} text-xs`}>
                                  {config.icon}
                                  {config.label}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                {formatDate(item.timestamp)}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">{item.name}</span>
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Phone className="w-3 h-3" />
                                  <span className="text-xs">{item.phone}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {item.message}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;