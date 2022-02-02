import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import drugListReducer from './drugListSlice'

const reducer = combineReducers({
    drugListReducer,
  })

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof reducer>

export default store