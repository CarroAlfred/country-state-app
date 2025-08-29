import './styles.css';
import { useState, useMemo, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SkeletonList } from '../loaders';

interface AutocompleteProps<T> {
  items: T[];
  displayKey: keyof T;
  onSelect: (item: T) => void;
  placeholder?: string;
  isLoading?: boolean;
  value?: T;
}

export function Autocomplete<T extends { id: number | string }>({
  items,
  displayKey,
  onSelect,
  placeholder = 'Search...',
  isLoading,
  value,
}: AutocompleteProps<T>) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    return items.filter((item) => String(item[displayKey]).toLowerCase().includes(search.toLowerCase()));
  }, [items, search, displayKey]);

  const selectedItem = items.find((item) => item === value);

  return (
    <div
      ref={containerRef}
      className='autocomplete'
    >
      <input
        type='text'
        placeholder={placeholder}
        value={value ? String(selectedItem?.[displayKey]) : search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsOpen(false);
        }}
        className='autocomplete-input'
        aria-expanded={isOpen}
        aria-autocomplete='list'
        aria-controls='autocomplete-listbox'
        role='combobox'
      />

      <span
        className='autocomplete-icon'
        aria-hidden='true'
      >
        <FiChevronDown />
      </span>
      {isOpen && filtered.length > 0 && (
        <ul
          id='autocomplete-listbox'
          role='listbox'
          className='autocomplete-list'
        >
          {isLoading ? (
            <SkeletonList count={3} />
          ) : (
            filtered.map((item) => (
              <li
                key={item.id}
                role='option'
                aria-selected={value ? item === value : false}
                tabIndex={0}
                onClick={() => {
                  onSelect(item);
                  setSearch(String(item[displayKey]));
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(item);
                    setSearch(String(item[displayKey]));
                    setIsOpen(false);
                  }
                }}
                className='autocomplete-option'
              >
                {String(item[displayKey])}
              </li>
            ))
          )}
        </ul>
      )}

      {isOpen && filtered.length === 0 && <div className='autocomplete-empty'>No results</div>}
    </div>
  );
}
