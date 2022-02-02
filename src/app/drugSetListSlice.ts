import DrugSet from '../models/Drugset'
import type { RootState } from './store'

const initialState = {
  drugSetList: [
    { list: [] as DrugSet[] },
  ],
}

export default function drugSetListReducer(state = initialState, action: any) {
  switch (action.type) {

    case 'drugSetList/updateSetList': {
      return{
        ...state,
        drugSetList: [  
            ...state.drugSetList,
            {
              list: action.payload
            }
        ]
      }

    }

    default:
      
      return state
  }

}

export const getDrugsets = (state: RootState) => state.drugSetListReducer.drugSetList.at(state.drugSetListReducer.drugSetList.length - 1)?.list
