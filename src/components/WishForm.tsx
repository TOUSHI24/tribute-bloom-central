import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Heart, Cake, Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export type WishType = 'birthday' | 'anniversary' | 'tribute';

interface WishFormProps {
  type: WishType;
  onSendWish: (data: WishData) => void;
}

export interface WishData {
  type: WishType;
  name: string;
  phone: string;
  message: string;
  timestamp: number;
}

const WishForm = ({ type, onSendWish }: WishFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getThemeConfig = () => {
    switch (type) {
      case 'birthday':
        return {
          title: '🎂 Birthday Wishes',
          icon: <Cake className="w-6 h-6" />,
          placeholder: 'Happy Birthday! Wishing you joy, happiness, and all the wonderful things in life. May your special day be filled with love and laughter! 🎉',
          buttonText: 'Send Birthday Wish',
          cardClass: 'birthday-theme border-birthday-primary/20 shadow-lg shadow-birthday-primary/10',
          buttonClass: 'bg-birthday-primary hover:bg-birthday-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300',
        };
      case 'anniversary':
        return {
          title: '💕 Anniversary Wishes',
          icon: <Heart className="w-6 h-6" />,
          placeholder: 'Happy Anniversary! May your love continue to grow stronger with each passing year. Wishing you both endless happiness and beautiful moments together! ❤️',
          buttonText: 'Send Anniversary Wish',
          cardClass: 'anniversary-theme border-anniversary-primary/20 shadow-lg shadow-anniversary-primary/10',
          buttonClass: 'bg-anniversary-primary hover:bg-anniversary-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300',
        };
      case 'tribute':
        return {
          title: '🕯️ Memorial Tribute',
          icon: <Flame className="w-6 h-6" />,
          placeholder: 'In loving memory... May their beautiful soul rest in peace and their memory be a blessing to all who knew them. Our thoughts and prayers are with you during this difficult time. 🤍',
          buttonText: 'Send Memorial Message',
          cardClass: 'tribute-theme border-tribute-accent/20 shadow-lg shadow-tribute-primary/20',
          buttonClass: 'bg-tribute-accent hover:bg-tribute-secondary text-tribute-background shadow-lg hover:shadow-xl transition-all duration-300',
        };
    }
  };

  const config = getThemeConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call to Twilio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const wishData: WishData = {
        ...formData,
        type,
        timestamp: Date.now(),
      };
      
      onSendWish(wishData);
      
      toast({
        title: "Message Sent! 🎉",
        description: `Your ${type} message has been sent successfully via WhatsApp.`,
      });
      
      // Reset form
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 animate-slide-up">
      <Card className={`${config.cardClass} backdrop-blur-sm border-2`}>
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
            {config.icon}
            {config.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-lg py-3 bg-white/50 backdrop-blur border-2 focus:border-current"
                required
              />
            </div>
            
            <div>
              <Input
                type="tel"
                placeholder="Phone number (with country code)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="text-lg py-3 bg-white/50 backdrop-blur border-2 focus:border-current"
                required
              />
            </div>
            
            <div>
              <Textarea
                placeholder={config.placeholder}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[120px] text-lg bg-white/50 backdrop-blur border-2 focus:border-current resize-none"
                required
              />
            </div>
            
            <Button
              type="submit"
              className={`w-full py-4 text-lg font-semibold ${config.buttonClass}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  {config.buttonText}
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishForm;