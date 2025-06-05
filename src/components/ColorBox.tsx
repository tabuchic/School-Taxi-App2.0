import React from 'react';
import { cn } from '@/lib/utils';

interface ColorBoxProps {
  color: string;
  isSelected: boolean;
  onClick?: () => void;
  isClickable?: boolean;
  size?: 'small' | 'large';
}

const ColorBox: React.FC<ColorBoxProps> = ({
  color,
  isSelected,
  onClick,
  isClickable = false,
  size = 'small',
}) => {
  // Use Tailwind standard sizes:
  const sizeClasses = size === 'large' ? 'w-24 h-24' : 'w-16 h-16';
  const selectedSizeClasses = size === 'large' ? 'w-28 h-28' : 'w-20 h-20';

  return (
    <div
      className={cn(
        isSelected ? selectedSizeClasses : sizeClasses,
        'rounded-lg border-2 border-gray-300 transition-all duration-300',
        'hover:shadow-lg transform',
        isSelected && 'shadow-xl border-white',
        !isSelected && 'scale-100 hover:scale-110',
        isClickable && 'hover:border-gray-500 cursor-pointer',
        !isClickable && 'cursor-default'
      )}
      style={{
        backgroundColor: color,
        animation: isSelected ? 'spin 5s linear infinite' : 'none',
      }}
      onClick={isClickable ? onClick : undefined}
    />
  );
};

export default ColorBox;
