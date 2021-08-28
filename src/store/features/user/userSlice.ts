import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { closeSession } from '../../../service/session'
import { ServerError, SessionDTO } from '../../../service/types'
import { getUser, createUser, User } from './../../../service/users'

interface InitialState {
  user: User | null
  error: string
  isLoaded: boolean
}

export const fetchUser = createAsyncThunk<
  User,
  SessionDTO,
  { rejectValue: ServerError }
>('user/fetchUser', async (session, { rejectWithValue, dispatch }) => {
  dispatch(resetLoaded())

  try {
    const user = await getUser(session)
    return user
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const exitUser = createAsyncThunk<void, void>(
  'user/exitUser',
  async () => {
    await closeSession()
    return
  }
)

const initialState: InitialState = {
  user: null,
  error: '',
  isLoaded: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoaded: (state) => {
      state.isLoaded = false
    },
    getLocalUser: (state) => {
      const localUser = localStorage.getItem('user')

      if (localUser) {
        state.user = JSON.parse(localUser)
        state.isLoaded = true
        state.error = ''
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload))

      state.user = action.payload
      state.isLoaded = true
      state.error = ''
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoaded = true
      state.error = String(action.payload?.message)
    })

    builder.addCase(exitUser.fulfilled, (state) => {
      localStorage.removeItem('user')

      state.user = null
      state.isLoaded = true
      state.error = ''
    })

    builder.addCase(exitUser.rejected, (state) => {
      state.error = 'Something wrong'
      state.isLoaded = true
    })
  },
})

export const { resetLoaded, getLocalUser } = userSlice.actions
export const userReducer = userSlice.reducer
