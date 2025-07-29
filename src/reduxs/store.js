import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './searchSlice'
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    product: productReducer,
  }
})

export default store
