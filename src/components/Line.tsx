import React from 'react';

interface LineProps {
  width: string;
  height?: string;
}

export const Line: React.FC<LineProps> = ({ width, height = '1px' }) => {
  return (
    <span
      className={`bg-elements-light dark:bg-elements-dark inline-block ${width}`}
      style={{ height }}
    ></span>
  );
};
