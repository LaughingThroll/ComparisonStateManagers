import { makeRequestFavqs } from './makeRequestFavqs'
import { createSession } from './session'
import { SuccessLogin, ServerError, UserLogin, SessionDTO } from './types'

interface User {
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

export const getUser = async (user: SessionDTO) => {
  const response = await createSession(user)

  if ('login' in response) {
    return makeRequestFavqs<User>(`users/${response.login}`, {
      headers: { 'User-Token': response['User-Token'] },
    })
  }

  console.log('error_code in session', response)
}
