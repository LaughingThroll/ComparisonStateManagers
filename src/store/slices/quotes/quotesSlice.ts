import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getQuotes, Quote } from '../../../service/quotes'
import { ServerError } from '../../../service/types'
import { RootState } from '../../store'

interface InitialState {
  error: string
  quotes: Quote[]
  isLoaded: boolean
}

const initialState: InitialState = {
  quotes: [],
  isLoaded: false,
  error: '',
}

export const fecthQuotes = createAsyncThunk<
  Quote[],
  number | undefined,
  { rejectValue: ServerError }
>('qoutes/fetchQuotes', async (page = 1, { rejectWithValue, dispatch }) => {
  dispatch(resetLoaded())

  const response = await getQuotes(page)

  if ('quotes' in response) {
    return response.quotes
  }

  return rejectWithValue(response)
})

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    resetLoaded: (state) => {
      state.isLoaded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fecthQuotes.fulfilled, (state, action) => {
      state.quotes = action.payload
      state.isLoaded = true
      state.error = ''
    })

    builder.addCase(fecthQuotes.rejected, (state, action) => {
      state.error = String(action.payload?.message)
      state.isLoaded = true
    })
  },
})

export const selectQuotes = (state: RootState) => state.quotes

export const { resetLoaded } = quotesSlice.actions
export const quotesReducer = quotesSlice.reducer
