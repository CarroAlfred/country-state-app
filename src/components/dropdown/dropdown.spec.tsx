import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './dropdown';

interface Item {
  id: number;
  label: string;
  value: string;
}

const items: Item[] = [
  { id: 1, label: 'Option 1', value: '1' },
  { id: 2, label: 'Option 2', value: '2' },
];

describe('Dropdown suite', () => {
  it('renders placeholder', () => {
    render(<Dropdown items={items} onChange={vi.fn()} placeholder="Choose..." />);
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('renders options', () => {
    render(<Dropdown items={items} onChange={vi.fn()} />);
    items.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
  });

  it('calls onChange when Dropdowning an option', () => {
    const onChange = vi.fn();
    render(<Dropdown items={items} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledWith('2');
  });
});
