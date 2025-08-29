import type { State } from '../../types';
import { api } from '../services/api';


export class StatesServicesApi {
  /**
   * Get State List base on Country Id.
   * @param id Country Id
   * @returns List of State {id: string, value: string}
   * @throws error if request fails
   */

  public static getStates(id: number) {
    return api.get<State.StateInfo[]>(`/countries/${id}/states`);
  }
}
