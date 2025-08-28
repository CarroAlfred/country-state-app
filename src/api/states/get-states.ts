import type { State } from '../../types';
import { api } from '../services/api';

export const getStatesApi = {
  getStateDetails: (id: number) => api.get<State.StateInfo[]>(`/countries/${id}/states`),
};
