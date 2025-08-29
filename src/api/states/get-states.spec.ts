import { vi, describe, it, expect, type Mock, beforeEach } from 'vitest';
import { StatesServicesApi } from './get-states';
import { api } from '../services/api';

vi.mock('../services/api.ts', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getStatesApi suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should fetch state details by country id', async () => {
    const mockData = [{ id: 1, name: 'California' }];
    (api.get as Mock).mockResolvedValue(mockData);

    const result = await StatesServicesApi.getStates(123);

    expect(api.get).toHaveBeenCalledWith('/countries/123/states');
    expect(result).toEqual(mockData);
  });

  it('should handle API error (failure)', async () => {
    const error = new Error('Network Error');
    (api.get as Mock).mockRejectedValue(error);

    await expect(StatesServicesApi.getStates(123)).rejects.toThrow('Network Error');

    try {
      await StatesServicesApi.getStates(123);
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});
