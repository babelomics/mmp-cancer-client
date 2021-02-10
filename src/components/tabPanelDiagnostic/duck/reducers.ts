import types from './types';
import { AnyAction } from 'redux';
import IState from '../interfaces';
import _ from 'lodash';

export const initialState: IState = {
  loading: false,
  error: null,
  success: null,
  diagnosticPanelGlobal: {
    assembly: null,
    author: null,
    creationDate: null,
    deletionDate: null,
    description: null,
    diagnosticPanelIdentifier: '',
    diagnosticPanelSetIdentifier: '',
    name: null,
    previousVersion: '',
    nextVersion: '',
    isHuman: false,
    ascendants: [],
    descendants: [],
    regionList: [],
    variantList: [],
    geneList: [],
    hpoList: [],
    icd10List: [],
    transcriptList: [],
    guid: ''
  },
  panelSetId: '',
  assemblyId: '',
  mode: 'new'
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type, payload } = action;
  let ascendants = [...state.diagnosticPanelGlobal.ascendants];
  let descendants = [...state.diagnosticPanelGlobal.descendants];
  let regions = [...state.diagnosticPanelGlobal.regionList];
  let variants = [...state.diagnosticPanelGlobal.variantList];

  switch (type) {
    case types.AC_INIT_FETCH:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_FETCH:
      return {
        ...state,
        loading: false
      };
    case types.AC_LOAD_PANEL_DATA:
      return {
        ...state,
        diagnosticPanelGlobal: payload,
        mode: 'edit'
      };
    case types.AC_UPDATE_PANEL_DATA:
      return {
        ...state,
        diagnosticPanelGlobal: { ...state.diagnosticPanelGlobal, ...payload }
      };
    case types.AC_INIT_CREATE:
      return {
        ...state,
        loading: true
      };
    case types.AC_END_CREATE:
      return {
        ...state,
        loading: false
      };
    case types.AC_ERR_CREATE:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case types.AC_NEW_ASCENDANT:
      ascendants.push(payload);
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          ascendants: [...ascendants]
        }
      };
    case types.AC_NEW_DESCENDANT:
      descendants.push(payload);
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          descendants: [...descendants]
        }
      };
    case types.AC_DELETE_ASCENDANT:
      ascendants = ascendants.filter((el: any) => {
        return el.diagnosticPanelIdentifier !== payload;
      });
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          ascendants: [...ascendants]
        }
      };
    case types.AC_DELETE_DESCENDANT:
      if (payload.delete) {
        descendants.forEach((desc: any, i: number) => {
          if (desc.diagnosticPanelIdentifier === payload.identifier) {
            descendants[i].toDelete = true;
          }
        });
      } else {
        descendants = descendants.filter((el: any) => {
          return el.diagnosticPanelIdentifier !== payload.identifier;
        });
      }
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          descendants: [...descendants]
        }
      };
    case types.AC_NEW_REGION:
      let newRegion = { ...payload };
      regions = regions.filter((el: any) => {
        if (newRegion.chromosome !== el.chromosome) {
          return true;
        } else if (parseInt(newRegion.initPosition) > parseInt(el.endPosition) || parseInt(newRegion.endPosition) < parseInt(el.initPosition)) {
          return true;
        } else if (parseInt(newRegion.initPosition) <= parseInt(el.initPosition) && parseInt(newRegion.endPosition) >= parseInt(el.endPosition)) {
          return false;
        } else if (parseInt(newRegion.initPosition) >= parseInt(el.initPosition) && parseInt(newRegion.endPosition) <= parseInt(el.endPosition)) {
          newRegion = { ...el };
          return false;
        } else if (parseInt(newRegion.initPosition) <= parseInt(el.endPosition) && parseInt(newRegion.endPosition) > parseInt(el.endPosition)) {
          newRegion.initPosition = el.initPosition;
          newRegion.regionIdentifier = `${newRegion.chromosome}:${newRegion.initPosition}:${newRegion.endPosition}`;
          return false;
        } else if (parseInt(newRegion.endPosition) >= parseInt(el.initPosition) && parseInt(newRegion.initPosition) < parseInt(el.initPosition)) {
          newRegion.endPosition = el.endPosition;
          newRegion.regionIdentifier = `${newRegion.chromosome}:${newRegion.initPosition}:${newRegion.endPosition}`;
          return false;
        }
      });
      regions.push(newRegion);
      regions.sort((a, b) => (a.chromosome as any) - (b.chromosome as any) || (a.initPosition as any) - (b.initPosition as any) || (a.endPosition as any) - (b.endPosition as any));
      // regions.sort((a, b) => {
      //   return a.chromosome < b.chromosome ? -1 : 1;
      // });

      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          regionList: [...regions]
        }
      };
    case types.AC_DELETE_REGION:
      regions = regions.filter((el: any) => {
        return el.regionIdentifier !== payload;
      });
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          regionList: [...regions]
        }
      };
    case types.AC_NEW_VARIANT:
      variants.push(payload);
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          variantList: _.uniqBy(variants, 'variantIdentifier')
        }
      };
    case types.AC_DELETE_VARIANT:
      variants = variants.filter((el: any) => {
        return el.variantIdentifier !== payload;
      });
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          variantList: [...variants]
        }
      };
    case types.AC_RESET_GENONIC_REFERENCE:
      return initialState;
    case types.AC_PANELSET_ID:
      return {
        ...state,
        panelSetId: action.playload
      };
    case types.AC_ASSEMBLY_ID:
      return {
        ...state,
        assemblyId: action.playload
      };
    case types.AC_DELETE_GENE:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          geneList: state.diagnosticPanelGlobal.geneList.filter((x) => x.geneId !== payload)
        }
      };
    case types.AC_ADD_GENE:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          geneList: state.diagnosticPanelGlobal.geneList.concat(payload)
        }
      };
    case types.AC_DELETE_TRANSCRIPT:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          transcriptList: state.diagnosticPanelGlobal.transcriptList.filter((x) => x.transcriptId !== payload)
        }
      };
    case types.AC_ADD_TRANSCRIPT:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          transcriptList: state.diagnosticPanelGlobal.transcriptList.concat(payload)
        }
      };
    case types.AC_DELETE_HPO:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          hpoList: state.diagnosticPanelGlobal.hpoList.filter((x) => x.hpoId !== payload)
        }
      };
    case types.AC_ADD_HPO:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          hpoList: state.diagnosticPanelGlobal.hpoList.concat(payload)
        }
      };
    case types.AC_ADD_ICD10:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          icd10List: state.diagnosticPanelGlobal.icd10List.concat(payload)
        }
      };
    case types.AC_DELETE_ICD10:
      return {
        ...state,
        diagnosticPanelGlobal: {
          ...state.diagnosticPanelGlobal,
          icd10List: state.diagnosticPanelGlobal.icd10List.filter((x) => x.id !== payload)
        }
      };
    default:
      return state;
  }
};

export default reducer;
