import DrugSet from '../models/Drugset'
import type { RootState } from './store'

const initialState = {
  drugSetList: [] as DrugSet[],
}

export default function drugSetListReducer(state = initialState, action: any) {
  switch (action.type) {

    case 'drugSetList/updateSetList': {
      return{
        drugSetList: action.payload
      }

    }

    default:
      
      return state
  }

}

