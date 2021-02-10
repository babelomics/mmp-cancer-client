import { Dispatch } from 'redux';

import actions from './actions';
import api from './api';

const updateGenomicReferenceData = actions.updateGenomicReferenceData;

const resetRedux = actions.resetRedux;

const setOpenSpeciesPopup = actions.setOpenSpeciesPopup;
const setOpenAssemblyPopup = actions.setOpenAssemblyPopup;

const fetchSpiecesAssembly = (idAssembly: string) => (dispatch: Dispatch) => {
  dispatch(actions.initFetch());
  api
    .apiGetSpiecesAssembly(idAssembly)
    .then((result) => {
      dispatch(actions.loadSpeciesAssembly(result.data[0]));
      dispatch(actions.endFetch());
    })

    .catch((err: any) => {
      dispatch(actions.endFetch());
      dispatch(actions.errFetch());
    });
};

const fechAssemblyAccession = (accession: string) => (dispatch: Dispatch) => {
  api
    .apiAssemblyAccession(accession)
    .then((result) => {
      dispatch(actions.loadEnsemblReleaseData(result.data));
      dispatch(actions.updateGenomicReferenceData({ ensemblRelease: result.data[0] }));
    })
    .catch((err: any) => {
      dispatch(actions.errFetch());
    });
};

export default { setOpenAssemblyPopup, setOpenSpeciesPopup, resetRedux, updateGenomicReferenceData, fetchSpiecesAssembly, fechAssemblyAccession };
