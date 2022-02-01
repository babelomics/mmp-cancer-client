import { createSlice } from '@reduxjs/toolkit'
import Drug from '../models/Drug'
import { Dispatch } from 'redux';

const drugListSlice = createSlice({
  name: 'drugList',
  initialState: {
    drugList: [] as Drug[]
  },
  reducers: {
    updateList: (state, action) => {
      state.drugList = action.payload
    },
  },
});

export const { updateList } = drugListSlice.actions

export default drugListSlice.reducer 
