import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, expect, it } from 'vitest';
import { useGetStatesDetails } from './use-get-states-details';
import { getStatesApi } from '../../api/states/get-states';
import { createWrapper } from '../../utils'; 

vi.mock('../../api/states/get-states', () => ({
  getStatesApi: {
    getStateDetails: vi.fn(),
  },
}));

describe('useGetStatesDetails', () => {
  it('should fetch states successfully', async () => {
    const mockData = [{ id: 101, name: 'Cebu' }];
    (getStatesApi.getStateDetails as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValue(mockData);

    const { result } = renderHook(() => useGetStatesDetails({ id: 1 }), {
      wrapper: createWrapper(),
    });

    // wait until hook reports success
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    expect(getStatesApi.getStateDetails).toHaveBeenCalledWith(1);
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch states');
    (getStatesApi.getStateDetails as unknown as ReturnType<typeof vi.fn>)
      .mockRejectedValue(mockError);

    const { result } = renderHook(() => useGetStatesDetails({ id: 999 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeFalsy();
    });

    expect(result.current.error).toEqual(null);
    expect(getStatesApi.getStateDetails).toHaveBeenCalledWith(999);
  });
});
