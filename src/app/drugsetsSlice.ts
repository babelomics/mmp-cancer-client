import Drugset from "../models/drugset"

const initialState = {
  drugSetList: [] as Drugset[],
}

export default function drugSetList(state = initialState, action: any) {
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

