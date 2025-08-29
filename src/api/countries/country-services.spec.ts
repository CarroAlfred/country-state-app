import { vi, describe, it, expect, type Mock, beforeEach } from 'vitest';
import { CountryServicesApi } from './country-services';
import { api } from '../services/api';

vi.mock('../services/api.ts', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('country service suite', () => {
   beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('getCountry List suite', () => {
    it('should fetch country list (success)', async () => {
      const mockData = [{ id: 1, name: 'Philippines' }];
      (api.get as Mock).mockResolvedValue(mockData);

      const result = await CountryServicesApi.getAllCountries();

      expect(api.get).toHaveBeenCalledWith('/countries');
      expect(result).toEqual(mockData);
    });

    it('should handle API error (failure)', async () => {
      const error = new Error('Network Error');
      (api.get as Mock).mockRejectedValue(error);

      await expect(CountryServicesApi.getAllCountries()).rejects.toThrow('Network Error');

      try {
        await CountryServicesApi.getAllCountries();
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });
});
