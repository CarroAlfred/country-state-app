import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './styles.css';

interface DropdownItem<T> {
  id: number | string;
  label: string;
  value: T;
}

interface DropdownProps<T> {
  items: DropdownItem<T>[];
  value?: T;
  onChange: (item: DropdownItem<T>) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Dropdown<T>({ items, value, onChange, disabled, placeholder = 'Select...' }: DropdownProps<T>) {
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

  const selectedItem = items.find((item) => item.value === value);

  return (
    <div
      ref={containerRef}
      className={`autocomplete ${disabled ? 'autocomplete-disabled' : ''}`}
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
          {items.map((item) => (
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
          ))}
        </ul>
      )}

      {isOpen && items.length === 0 && <div className='dropdown-empty'>No options</div>}
    </div>
  );
}
