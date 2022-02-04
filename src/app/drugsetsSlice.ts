import DrugSet from '../models/drugSet'

const initialState = {
  drugSetList: [] as DrugSet[],
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

