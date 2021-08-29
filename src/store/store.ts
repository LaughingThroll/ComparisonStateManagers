import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './slices/quotes/quotesSlice'
import { userReducer } from './slices/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    quotes: quotesReducer,
  },
})

export type AppDisaptch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
