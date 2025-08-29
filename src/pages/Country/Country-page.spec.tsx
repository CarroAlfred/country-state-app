import { describe, it, vi, beforeEach, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CountryPage } from './Country-page';
import * as hooks from '../../hooks';

const mockCountries = [
  { id: 1, value: 'Philippines' },
  { id: 2, value: 'USA' },
];

const mockStatesPH = [
  { id: 10, value: 'Manila' },
  { id: 11, value: 'Cebu' },
];

describe('CountryPag suite', () => {
  beforeEach(() => {
    vi.spyOn(hooks, 'useGetCountries').mockReturnValue({
      data: mockCountries,
      isLoading: false,
    } as any);

    vi.spyOn(hooks, 'useGetStatesDetails').mockImplementation(
      ({ id }) =>
        ({
          data: id === 1 ? mockStatesPH : [],
          isLoading: false,
        }) as any,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders country dropdown', () => {
    render(<CountryPage />);
    expect(screen.getByText('Select a country')).toBeInTheDocument();
  });

  it('renders state dropdown and updates when country is selected', async () => {
    render(<CountryPage />);

    // select Philippines
    fireEvent.click(screen.getByText('Select a country'));
    fireEvent.click(screen.getByText('Philippines'));

    await waitFor(() => {
      expect(screen.getByText('Search a state')).toBeInTheDocument();
    });

    // state options should appear
    fireEvent.click(screen.getByText('Search a state'));
    expect(screen.getByText('Manila')).toBeInTheDocument();
    expect(screen.getByText('Cebu')).toBeInTheDocument();
  });

  it('clears state when changing country', async () => {
    render(<CountryPage />);

    // select first country
    fireEvent.click(screen.getByText('Select a country'));
    fireEvent.click(screen.getByText('Philippines'));

    // select a state
    fireEvent.click(screen.getByText('Search a state'));
    fireEvent.click(screen.getByText('Manila'));
    expect(screen.getByText('Manila')).toBeInTheDocument();

    // change country
    fireEvent.click(screen.getByText('Philippines'));
    fireEvent.click(screen.getByText('USA'));

    // state should be cleared
    expect(screen.getByText('Search a state')).toBeInTheDocument();
  });
});
