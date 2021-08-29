import { makeRequestFavqs } from './makeRequestFavqs'
import { createSession } from './session'
import { SuccessLogin, UserLogin, SessionDTO, ServerError } from './types'

export interface User {
  login: string
  pic_url: string
  public_favorites_count: number
  followers: number
  following: number
  pro: boolean
}

export const createUser = (user: UserLogin) => {
  return makeRequestFavqs<SuccessLogin | ServerError>(`users`, {
    method: 'POST',
    body: JSON.stringify({ user }),
  })
}

const getUserHelper = (login: string, token: string) => {
  const userResponse = makeRequestFavqs<User | ServerError>(`users/${login}`, {
    headers: { 'User-Token': token },
  })

  return userResponse
}

export const getUser = async (user: SessionDTO) => {
  const response = await createSession(user)

  return getUserHelper(response.login, response['User-Token'])
}
