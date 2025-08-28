import type { Country } from '../../types';
import { api } from '../services/api';



export const getCountryApi = {
  getAll: () => api.get<Country.CountryInfo[]>('/countries'),
};
