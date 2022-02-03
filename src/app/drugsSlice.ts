import Drug from '../models/Drug'
import type { RootState } from './store'

const initialState = {
  drugList: [] as Drug[] ,
}

export default function drugList(state = initialState, action: any) {
  switch (action.type) {

    case 'drugList/updateList': {
      return{
        
        drugList: action.payload
      
      }

    }

    default:
      
      return state
  }

}


