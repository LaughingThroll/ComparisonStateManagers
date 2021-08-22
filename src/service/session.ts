import { makeRequestFavqs } from './makeRequestFavqs'
import { SuccessLogin, ServerError, SessionDTO } from './types'

interface SuccessSession extends SuccessLogin {
  email: string
}

export const createSession = (user: SessionDTO) => {
  return makeRequestFavqs<SuccessSession | ServerError>('session', {
    method: 'POST',
    body: JSON.stringify({ user }),
  })
}

export const closeSession = () => {
  return makeRequestFavqs<{ message: string }>('session', {
    method: 'DELETE',
  }).then(() => {
    localStorage.removeItem('user')
  })
}
