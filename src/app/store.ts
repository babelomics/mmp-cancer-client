import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import drugListReducer from './drugsSlice'
import drugSetListReducer from './drugsetsSlice'

const reducer = combineReducers({
    drugListReducer,
    drugSetListReducer,
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