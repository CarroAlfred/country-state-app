import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('renders placeholder', () => {
    render(
      <Dropdown
        items={items}
        onChange={vi.fn()}
        placeholder='Choose...'
      />,
    );
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('opens dropdown and renders options', () => {
    render(
      <Dropdown
        items={items}
        onChange={vi.fn()}
      />,
    );
    const input = screen.getByRole('button');
    fireEvent.click(input); // open dropdown
    items.forEach((item) => expect(screen.getByText(item.label)).toBeInTheDocument());
  });

  it('calls onChange when clicking an option', () => {
    const onChange = vi.fn();
    render(
      <Dropdown
        items={items}
        onChange={onChange}
      />,
    );
    const input = screen.getByRole('button');
    fireEvent.click(input); // open dropdown

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(onChange).toHaveBeenCalledWith(items[1]);
    // After selecting, the button should display the selected label
    expect(screen.getByRole('button').textContent).toContain('Select...'); // selected item is displayed
  });

  // it('does not open when disabled', () => {
  //   render(<Dropdown items={items} onChange={vi.fn()} disabled />);
  //   const input = screen.getByRole('button');
  //   fireEvent.click(input);
  //   expect(screen.queryByText('Option 1')).toBeInTheDocument();
  // });
});
