import { AnyAction } from 'redux';
import IState from '../interfaces';

export const initialState: IState = {
  loading: false
};

const reducer = (state: IState = initialState, action: AnyAction) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};

export default reducer;
