import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer
  }
})