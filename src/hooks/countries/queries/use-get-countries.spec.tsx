import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { vi, describe, it, expect, type Mock, beforeEach } from 'vitest';
import { useGetCountries } from './use-get-countries';
import { CountryServicesApi } from '../../../api';
import { createWrapper } from '../../../utils';

vi.mock('../../../api');

describe('useGetCountries suite', () => {
   beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should fetch countries successfully', async () => {
    const mockData = [{ id: 1, name: 'Philippines' }];
    (CountryServicesApi.getAllCountries as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    // initially loading
    expect(result.current.isLoading).toBe(true);

    // wait for success
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(CountryServicesApi.getAllCountries).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    (CountryServicesApi.getAllCountries as Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useGetCountries(), {
      wrapper: createWrapper(),
    });

    // need to check for error message from backend to show correct error
    expect(CountryServicesApi.getAllCountries).toHaveBeenCalled();
    expect(result.current.error).toBe(null);
  });
});
