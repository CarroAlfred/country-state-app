import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, expect, it, type Mock, beforeEach } from 'vitest';
import { useGetStatesDetails } from './use-get-states-details';
import { StatesServicesApi } from '../../api';
import { createWrapper } from '../../utils';

vi.mock('../../api');

describe('useGetStatesDetails suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch states successfully', async () => {
    const mockData = [{ id: 101, name: 'Cebu' }];
    (StatesServicesApi.getStates as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetStatesDetails({ id: 1 }), {
      wrapper: createWrapper(),
    });

    // wait until hook reports success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(StatesServicesApi.getStates).toHaveBeenCalledWith(1);
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch states');
    (StatesServicesApi.getStates as Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetStatesDetails({ id: 999 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeFalsy();
    });

    expect(result.current.error).toEqual(null);
    expect(StatesServicesApi.getStates).toHaveBeenCalledWith(999);
  });
});
