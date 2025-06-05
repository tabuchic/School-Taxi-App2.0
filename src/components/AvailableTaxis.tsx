import React from 'react';
import ColorBox from './ColorBox';

interface AvailableTaxisProps {
  colors: string[];
  selectedColors: boolean[];
  taxiNames: string[];
  showLabels?: boolean;
}

const AvailableTaxis: React.FC<AvailableTaxisProps> = ({
  colors,
  selectedColors,
  taxiNames,
  showLabels = true,
}) => {
  const availableTaxis = colors
    .map((color, index) => ({ color, index, name: taxiNames[index] }))
    .filter((_, index) => selectedColors[index])
    .slice(0, 4);

  return (
    <div className="flex justify-center items-center p-8 min-h-[250px] bg-gradient-to-br from-blue-50 to-green-50">
      {availableTaxis.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-lg">No taxis available</p>
        </div>
      ) : (
        <div className="flex justify-evenly items-center w-full">
          {availableTaxis.map(({ color, index, name }) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="transform scale-125 animate-spin-slower">
                <ColorBox
                  color={color}
                  isSelected={true}
                  isClickable={false}
                  size="large"
                />
              </div>
              {showLabels && (
                <span className="text-sm text-gray-700">{name}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTaxis;
