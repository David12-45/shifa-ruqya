import React from 'react';
import {
  Activity,
  Brain,
  Coins,
  Flame,
  HeartHandshake,
  Home,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { CategoryInfo } from '../types/ruqya';

interface CategoryIconProps {
  name: CategoryInfo['iconName'];
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  className = 'w-5 h-5',
}) => {
  switch (name) {
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Brain':
      return <Brain className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Coins':
      return <Coins className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Home':
      return <Home className={className} />;
  }
};
