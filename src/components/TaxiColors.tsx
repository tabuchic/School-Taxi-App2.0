import React from 'react';
import ColorBox from './ColorBox';
import { Input } from '@/components/ui/input';

interface TaxiColorsProps {
  colors: string[];
  selectedColors: boolean[];
  taxiNames: string[];
  onColorToggle: (index: number) => void;
  onNameChange: (index: number, name: string) => void;
  isClickable: boolean;
  showLabels?: boolean;
}

const TaxiColors: React.FC<TaxiColorsProps> = ({
  colors,
  selectedColors,
  taxiNames,
  onColorToggle,
  onNameChange,
  isClickable,
  showLabels = false,
}) => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <ColorBox
            color={color}
            isSelected={selectedColors[index]} // shows selection state visually
            onClick={() => isClickable && onColorToggle(index)} // only toggle if clickable
            isClickable={isClickable}
          />
          {isClickable ? (
            <Input
              value={taxiNames[index]}
              onChange={(e) => onNameChange(index, e.target.value)}
              className="text-center text-xs w-16"
            />
          ) : (
            showLabels && (
              <span className="text-xs text-center text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {taxiNames[index]}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default TaxiColors;
