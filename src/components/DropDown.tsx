import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { FilterOption } from '../types/FilterOptions';

type Props = {
  className?: string;
  query: string;
  label: string;
  options: FilterOption[];
};

export const Dropdown: React.FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(props.query);
  const [isOpen, setIsOpen] = useState(false);
  const { className, label, options } = props;
  const currentValue = query || options[0].value;

  const handleSelectFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(props.query, value);
    setSearchParams(params);
    setIsOpen(false);
  };

  return (
    <div>
      <h3 className="text-secondary-light dark:text-secondary-dark text-xs font-bold mb-1">
        {label}
      </h3>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          onBlur={() =>
            setTimeout(() => {
              setIsOpen(false);
            }, 100)
          }
          className={classNames(
            className,
            [
              'h-10 px-[12px] py-[10px]',
              'flex justify-between items-center',
              'rounded-lg border-2 border-icons-light',
              'hover:border-secondary',
            ],
            {
              '!border-primary-light': isOpen,
            },
          )}
        >
          <p className="text-stone-950 text-sm font-bold leading-[21px] dark:text-primary-dark">
            {currentValue}
          </p>
          {!isOpen ? (
            <FiChevronDown className="text-icons-light" />
          ) : (
            <FiChevronUp className="text-icons" />
          )}
        </button>

        {isOpen && (
          <div
            className={classNames(
              className,
              'absolute left-0 z-10 mt-2 w-[136px] rounded-md shadow-option bg-white-light dark:bg-white-dark  ring-opacity-5 focus:outline-none border-2 border-icons-light',
            )}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div role="none">
              {options.map((option) => (
                <button
                  key={option.value}
                  className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark  block px-4 py-2 text-sm w-full text-left hover:bg-hover-bg-light dark:hover:bg-hover-bg-dark hover:rounded-md"
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${option.value}`}
                  onClick={() => handleSelectFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
