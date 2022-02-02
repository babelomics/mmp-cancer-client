import Drug from '../models/Drug'
import type { RootState } from './store'

const initialState = {
  drugList: [
    { list: [] as Drug[] },
  ],
}

export default function drugListReducer(state = initialState, action: any) {
  switch (action.type) {

    case 'drugList/updateList': {
      return{
        ...state,
        drugList: [  
            ...state.drugList,
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

export const getDrugs = (state: RootState) => state.drugListReducer.drugList.at(state.drugListReducer.drugList.length - 1)?.list

