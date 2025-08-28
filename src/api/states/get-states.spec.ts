import { vi, describe, it, expect, type Mock } from 'vitest';
import { getStatesApi } from './get-states';
import { api } from '../services/api';

vi.mock('../services/api.ts', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getStatesApi suite', () => {
  it('should fetch state details by country id', async () => {
    const mockData = [{ id: 1, name: 'California' }];
    (api.get as Mock).mockResolvedValue(mockData);

    const result = await getStatesApi.getStateDetails(123);

    expect(api.get).toHaveBeenCalledWith('/countries/123/states');
    expect(result).toEqual(mockData);
  });

  it('should handle API error (failure)', async () => {
      const error = new Error('Network Error');
      (api.get as Mock).mockRejectedValue(error);
  
      await expect(getStatesApi.getStateDetails(123)).rejects.toThrow('Network Error');
  
      try {
        await getStatesApi.getStateDetails(123);
      } catch (err) {
        expect(err).toBe(error);
      }
    });
});
