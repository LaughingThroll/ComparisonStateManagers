import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { closeSession } from '../../../service/session'
import { getUser, createUser, User } from './../../../service/users'
import {
  ServerError,
  SessionDTO,
  SuccessLogin,
  UserLogin,
} from '../../../service/types'
import { RootState } from '../../store'

interface InitialState {
  user: User | null
  userLogin: SuccessLogin | null
  error: string
  isLoaded: boolean
}

const initialState: InitialState = {
  user: null,
  error: '',
  isLoaded: false,
  userLogin: null,
}

export const fetchUser = createAsyncThunk<
  User,
  SessionDTO,
  { rejectValue: ServerError }
>('user/fetchUser', async (session, { rejectWithValue, dispatch }) => {
  dispatch(resetLoaded())

  const user = await getUser(session)

  if ('login' in user) {
    return user
  }

  return rejectWithValue(user)
})

export const makeUser = createAsyncThunk<
  SuccessLogin,
  UserLogin,
  { rejectValue: ServerError }
>('user/makeUser', async (userLogin: UserLogin, { rejectWithValue }) => {
  const response = await createUser(userLogin)

  if ('login' in response) {
    return response
  }

  return rejectWithValue(response)
})

export const exitUser = createAsyncThunk<void, void>(
  'user/exitUser',
  async () => {
    await closeSession()
    return
  }
)

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

    builder.addCase(makeUser.fulfilled, (state, action) => {
      state.userLogin = action.payload
      state.isLoaded = true
      state.error = ''
    })

    builder.addCase(makeUser.rejected, (state, action) => {
      state.error = String(action.payload?.message)
      state.isLoaded = true
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

export const selectUser = (state: RootState) => state.user

export const { resetLoaded, getLocalUser } = userSlice.actions
export const userReducer = userSlice.reducer
