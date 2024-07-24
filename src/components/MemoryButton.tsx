import React from 'react';

interface MemoryButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const MemoryButton: React.FC<MemoryButtonProps> = ({
  label,
  onClick,
  isActive,
}) => {
  return (
    <button
      onClick={onClick}
      className={`h-8 mr-2 mt-2 flex-shrink-0 rounded-md  border-secondary border-solid border focus:outline-none ${
        isActive
          ? 'bg-primary text-white border-none'
          : 'bg-white text-primary border-icons'
      }`}
    >
      <span className="mx-2 mt-7 mb-4">{label}</span>
    </button>
  );
};
