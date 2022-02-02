import Drug from '../models/Drug'
import type { RootState } from './store'

const initialState = {
  drugList: [
    { list: [] as Drug[] },
  ],
  isLoading: [
    {
      loading: false
    },
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

    case 'drugList/isLoading': {
      return{
        ...state,
        isLoading: [  
            ...state.isLoading,
            {
              loading: action.payload
            }
        ]
      }

    }

    default:
      
      return state
  }

}

export const getDrugs = (state: RootState) => state.drugListReducer.drugList.at(state.drugListReducer.drugList.length - 1)?.list
export const getLoading = (state: RootState) => state.drugListReducer.isLoading.at(state.drugListReducer.isLoading.length - 1)?.loading

