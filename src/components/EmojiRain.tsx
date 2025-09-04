import { useEffect, useState } from 'react';

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  animationDuration: number;
  delay: number;
}

interface EmojiRainProps {
  theme: 'birthday' | 'anniversary' | 'tribute';
}

const emojiSets = {
  birthday: ['🎉', '🎂', '🎈', '🎁', '✨', '🌟', '🎊', '🥳', '🎵', '💫'],
  anniversary: ['💕', '❤️', '💖', '🌹', '💐', '💝', '💞', '🌺', '💘', '💗'],
  tribute: ['🕯️', '🤍', '🕊️', '⭐', '💙', '🌸', '🙏', '💜', '🌙', '✨'],
};

const EmojiRain = ({ theme }: EmojiRainProps) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const createEmoji = () => {
      const emojiSet = emojiSets[theme];
      const emoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
      
      return {
        id: Math.random(),
        emoji,
        x: Math.random() * 100,
        animationDuration: Math.random() * 3 + 4, // 4-7 seconds
        delay: Math.random() * 2, // 0-2 seconds delay
      };
    };

    const interval = setInterval(() => {
      setEmojis(prev => {
        const newEmojis = [...prev, createEmoji()];
        // Keep only the last 15 emojis for performance
        return newEmojis.slice(-15);
      });
    }, 800);

    // Clean up emojis every 10 seconds
    const cleanup = setInterval(() => {
      setEmojis(prev => prev.slice(-10));
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="emoji-rain text-2xl absolute"
          style={{
            left: `${emoji.x}%`,
            animationDuration: `${emoji.animationDuration}s`,
            animationDelay: `${emoji.delay}s`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
};

export default EmojiRain;
