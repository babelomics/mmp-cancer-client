// Interfaces related to the component Example

import { IIndividual } from '../individualsManagement/interfaces';
import { IUserPermission } from '../permissionsAndUsers/interfaces';

export default interface IState {
  loading: boolean;
  individualData: IIndividual;
  permissionsPopupLoading: boolean;
  permissionsData: IUserPermission | null;
  excludedUsers: string[];
}

export interface IDeleteForm {
  confirmation: string;
}
