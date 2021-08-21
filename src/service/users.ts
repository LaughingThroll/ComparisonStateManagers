import { makeRequestFavqs } from './makeRequestFavqs'
import { createSession } from './session'
import { SuccessLogin, ServerError, UserLogin, SessionDTO } from './types'

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
  const userResponse = makeRequestFavqs<User>(`users/${login}`, {
    headers: { 'User-Token': token },
  })

  localStorage.setItem('userToken', token)
  return userResponse
}

export const getUser = async (user: SessionDTO) => {
  const userToken = localStorage.getItem('userToken')

  if (userToken) {
    return getUserHelper(user.login, userToken)
  }

  const response = await createSession(user)

  if ('login' in response) {
    getUserHelper(response.login, response['User-Token'])
  }

  console.log('error_code in session', response)
}
