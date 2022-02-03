import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import drugList from './drugsSlice'
import drugSetList from './drugsetsSlice'


const reducer = combineReducers({
    drugList,
    drugSetList,
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