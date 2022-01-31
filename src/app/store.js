import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from '../Components/Features/DrugSetSLice'

export default configureStore({
  reducer: {
    loading: loadingReducer
  }
})