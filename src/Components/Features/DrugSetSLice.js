import { createSlice } from '@reduxjs/toolkit'

export const DrugSetSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false
  },
  reducers: {
    setFalse: state => {
      state.value = false
    },
    setTrue: state => {
      state.value = true
    }
  }
})

export const { setFalse, setTrue } = DrugSetSlice.actions
export const selectLoading = state => state.loading.value


export default DrugSetSlice.reducer