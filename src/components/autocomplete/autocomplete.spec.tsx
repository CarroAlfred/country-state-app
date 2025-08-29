import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Autocomplete } from './autocomplete';

interface Country {
  id: number;
  value: string;
}

const mockCountries: Country[] = [
  { id: 1, value: 'Philippines' },
  { id: 2, value: 'Indonesia' },
  { id: 3, value: 'Malaysia' },
];

describe('Autocomplete suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders input with placeholder', () => {
    render(
      <Autocomplete
        items={mockCountries}
        displayKey='value'
        onSelect={vi.fn()}
        placeholder='Select a country'
      />,
    );
    expect(screen.getByPlaceholderText('Select a country')).toBeInTheDocument();
  });

  it('opens dropdown on focus', () => {
    render(
      <Autocomplete
        items={mockCountries}
        displayKey='value'
        onSelect={vi.fn()}
      />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('filters items based on input', () => {
    render(
      <Autocomplete
        items={mockCountries}
        displayKey='value'
        onSelect={vi.fn()}
      />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ind' } });
    expect(screen.getByText('Indonesia')).toBeInTheDocument();
    expect(screen.queryByText('Philippines')).toBeNull();
  });

  it('calls onSelect when item is clicked', () => {
    const onSelect = vi.fn();
    render(
      <Autocomplete
        items={mockCountries}
        displayKey='value'
        onSelect={onSelect}
      />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    const option = screen.getByText('Philippines');
    fireEvent.click(option);
    expect(onSelect).toHaveBeenCalledWith({ id: 1, value: 'Philippines' });
    expect(input).toHaveValue('Philippines');
  });

  it('shows empty message if no results match', () => {
    render(
      <Autocomplete
        items={mockCountries}
        displayKey='value'
        onSelect={vi.fn()}
      />,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'xyz' } });
    expect(screen.getByText('No results')).toBeInTheDocument();
  });
});
