import { configureStore } from '@reduxjs/toolkit'

const reducer = {
    // auth: authReducer,
}

export const store = configureStore({
  reducer: reducer
})