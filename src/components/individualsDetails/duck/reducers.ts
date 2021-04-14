import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false,
  individualData: {
    individualId: '',
    name: '',
    dateOfBirth: null,
    lifeStatus: {
      detail: '',
      status: ''
    },
    sex: '',
    comment: '',
    karyotypicSex: '',
    humanEthnicity: '',
    humanDisease: [],
    humanPhenotype: [],
    isHuman: false
  },
  permissionsPopupLoading: false,
  permissionsData: null,
  excludedUsers: []
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case types.AC_INIT_OPERATION:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_OPERATION:
      return {
        ...state,
        loading: false,
        permissionsPopupLoading: false
      };
    case types.AC_END_FETCH_DATA:
      return {
        ...state,
        loading: false,
        individualData: { ...payload, humanDisease: payload.humanDisease || [], humanPhenotype: payload.humanPhenotype || [] }
      };
    case types.AC_ADD_HPO:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanPhenotype: state.individualData.humanPhenotype?.concat(payload) ?? state.individualData.humanPhenotype
        }
      };
    case types.AC_DELETE_HPO:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanPhenotype: state.individualData.humanPhenotype?.filter((x) => x.phenotypeId !== payload) ?? state.individualData.humanPhenotype
        }
      };

    case types.AC_ADD_ICD10:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanDisease: state.individualData.humanDisease?.concat(payload) ?? state.individualData.humanDisease
        }
      };

    case types.AC_DELETE_ICD10:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanDisease: state.individualData.humanDisease?.filter((x) => x.diseaseId !== payload) ?? state.individualData.humanDisease
        }
      };

    case types.AC_UPDATE_HPO:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanPhenotype: state.individualData.humanPhenotype?.map((x) => {
            if (x.phenotypeId === payload.phenotypeId) {
              return { ...payload };
            }
            return { ...x };
          })
        }
      };

    case types.AC_UPDATE_ICD10:
      return {
        ...state,
        individualData: {
          ...state.individualData,
          humanDisease: state.individualData.humanDisease?.map((x) => {
            if (x.diseaseId === payload.diseaseId) {
              return { ...payload };
            }
            return { ...x };
          })
        }
      };
    case types.AC_INIT_FETCH_PERMISSIONS_DATA:
      return {
        ...state,
        permissionsPopupLoading: true
      };
    case types.AC_END_FETCH_PERMISSIONS_DATA:
      return {
        ...state,
        permissionsPopupLoading: false,
        permissionsData: payload
      };
    case types.AC_END_FETCH_PERMISSIONS_DATA:
      return {
        ...state,
        permissionsPopupLoading: false,
        permissionsData: payload
      };
    case types.AC_SET_EXCLUDED_USERS:
      return {
        ...state,
        excludedUsers: state.excludedUsers.concat(payload)
      };
    case types.AC_REMOVE_EXCLUDED_USER:
      return {
        ...state,
        excludedUsers: state.excludedUsers.filter((x) => x !== payload)
      };
    case types.AC_SET_PERMISSIONS_DATA:
      return {
        ...state,
        permissionsData: payload
      };
    case types.AC_RESET_REDUX_INDIVIDUAL:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
