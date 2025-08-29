import type { Country } from '../../types';
import { api } from '../services/api';

export class CountryServicesApi {
  /**
   * Get country List.
   * @returns List of Country {id: string, value: string}
   * @throws error if request fails
   */

  public static getAllCountries() {
    return api.get<Country.CountryInfo[]>('/countries');
  }

  /**
   * Create a country
   * @param value
   * @returns Created country {id: string, value: string}
   * @throws error if request fails
   */

  public static createCountry(data: { value: string }) {
    return api.post<Country.CountryInfo>('/countries', data);
  }
}
