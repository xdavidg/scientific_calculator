import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ExpandableSectionProps {
  isExpanded: boolean;
  toggleExpand: () => void;
  handleButton: (value: string) => void;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ isExpanded, toggleExpand, handleButton }) => {
  const additionalButtons = [
    'sinh',
    '^',
    'MAD',
    'σ',
    'log_b(x)',
    'ab^x',
    'arccos',
    'surprise',
  ];

  return (
    <div className={`expandable-section transition-all duration-300 ease-in-out overflow-hidden flex ${isExpanded ? 'w-64' : 'w-12'}`}>
      <button
        onClick={toggleExpand}
        className="w-12 h-full bg-[var(--keys-background)] text-[var(--text)] hover:bg-[var(--key-hover)] flex items-center justify-center flex-shrink-0"
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
      {isExpanded && (
        <div className="grid grid-cols-2 gap-2 p-2 flex-grow">
          {additionalButtons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButton(button)}
              className="p-3 bg-[var(--keys-background)] text-[var(--text)] hover:bg-[var(--key-hover)] rounded text-sm font-medium"
            >
              {button}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandableSection;