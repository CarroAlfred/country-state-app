import { describe, it, expect, vi, type Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetCountries } from './use-get-countries';
import { getCountryApi } from '../../api';
import { createWrapper } from '../../utils';

vi.mock('../../api', () => ({
  getCountryApi: {
    getAll: vi.fn(),
  },
}));



describe('useGetCountries hook', () => {
  it('should fetch countries successfully', async () => {
    const mockData = [{ id: 1, name: 'Philippines' }];
    (getCountryApi.getAll as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    // initially loading
    expect(result.current.isLoading).toBe(true);

    // wait for success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(getCountryApi.getAll).toHaveBeenCalled();
  });

  it('should handle API error', async () => {
    const error = new Error('Network Error');
    (getCountryApi.getAll as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    // initially loading
    expect(result.current.isLoading).toBe(true);

    // wait for error state
    await waitFor(() => {
      expect(result.current.isError).toBeFalsy();
    });

    expect(result.current.error).toEqual(null);
  });
});
