import { vi, describe, it, expect, type Mock } from 'vitest';
import { getCountryApi } from './get-countries';
import { api } from '../services/api';

vi.mock('../services/api.ts', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('getCountries suite', () => {
  it('should fetch country list (success)', async () => {
    const mockData = [{ id: 1, name: 'Philippines' }];
    (api.get as Mock).mockResolvedValue(mockData);

    const result = await getCountryApi.getAll();

    expect(api.get).toHaveBeenCalledWith('/countries');
    expect(result).toEqual(mockData);
  });

  it('should handle API error (failure)', async () => {
    const error = new Error('Network Error');
    (api.get as Mock).mockRejectedValue(error);

    await expect(getCountryApi.getAll()).rejects.toThrow('Network Error');

    try {
      await getCountryApi.getAll();
    } catch (err) {
      expect(err).toBe(error);
    }
  });
});
