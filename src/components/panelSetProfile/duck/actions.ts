import { IFormData, IReference } from '../interfaces';
import types from './types';

const initFetch = () => ({ type: types.AC_INIT_FETCH });
const errFetch = () => ({ type: types.AC_ERR_FETCH });
const endFetch = () => ({ type: types.AC_END_FETCH });
const fechPanelSetData = (panelSetData: IFormData) => ({ type: types.AC_LOAD_PANEL_SET_DATA, payload: panelSetData });
const updateReferencePanelSetData = (referenceData: IReference) => ({ type: types.AC_UPDATE_PANEL_SET_DATA, payload: referenceData });

export default { updateReferencePanelSetData, initFetch, errFetch, endFetch, fechPanelSetData };
