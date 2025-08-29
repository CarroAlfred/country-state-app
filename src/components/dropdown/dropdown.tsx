import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './styles.css';
import { SkeletonList } from '../loaders';

interface DropdownItem {
  id: number | string;
  label: string;
}

interface DropdownProps {
  items: DropdownItem[];
  value?: number | string;
  onChange: (item: DropdownItem) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function Dropdown({ items, value, onChange, isLoading, placeholder = 'Select...' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedItem = items.find((item: DropdownItem) => item.id === value);

  return (
    <div
      ref={containerRef}
      className={`dropdown ${isLoading ? 'dropdown-disabled' : ''}`}
    >
      <div
        className='dropdown-input'
        role='button'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedItem ? selectedItem.label : placeholder}
        <span className='dropdown-icon'>
          <FiChevronDown />
        </span>
      </div>
      {isOpen && (
        <ul className='dropdown-list'>
          {isLoading ? (
            <SkeletonList count={3} />
          ) : (
            items.map((item: DropdownItem) => (
              <li
                key={item.id}
                className='dropdown-option'
                role='option'
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      )}

      {isOpen && items.length === 0 && <div className='dropdown-empty'>No options</div>}
    </div>
  );
}
