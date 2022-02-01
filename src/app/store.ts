import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import drugListSlice from './drugs'

const reducer = combineReducers({
    drugListSlice,
  })

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof reducer>

export default store