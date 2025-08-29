import { renderHook, act, waitFor } from '@testing-library/react';
import { useCreateCountry } from './use-create-country';
import { CountryServicesApi } from '../../../api';
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';
import { createWrapper } from '../../../utils';

// Mock the API
vi.mock('../../../api', () => ({
  CountryServicesApi: {
    createCountry: vi.fn(),
  },
}));

describe('useCreateCountry suite', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call API and trigger onSuccess', async () => {
    const mockOnSuccess = vi.fn();
    const mockData = { id: 1, value: 'Philippines' };
    (CountryServicesApi.createCountry as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useCreateCountry({ onSuccess: mockOnSuccess }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleCreateCountry({ value: 'Philippines' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(CountryServicesApi.createCountry).toHaveBeenCalledWith({ value: 'Philippines' });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should handle API error and trigger onError', async () => {
    const mockOnError = vi.fn();
    (CountryServicesApi.createCountry as Mock).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useCreateCountry({ onError: mockOnError }), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleCreateCountry({ value: 'Philippines' });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockOnError).toHaveBeenCalled();
  });
});
