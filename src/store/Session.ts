import { makeAutoObservable, runInAction } from 'mobx'
import { makeRequestFavqs } from './../service/makeRequestFavqs'
import { SuccessLogin, ServerError, SessionDTO } from './../service/types'
import { authorizationStore } from './Authorization'

interface SuccessSession extends SuccessLogin {
  email: string
}

export class SessionStore {
  constructor() {
    makeAutoObservable(this)
  }

  createSession = (user: SessionDTO) => {
    return makeRequestFavqs<SuccessSession | ServerError>('session', {
      method: 'POST',
      body: JSON.stringify({ user }),
    })
  }

  closeSession = () => {
    return makeRequestFavqs<{ message: string }>('session', {
      method: 'DELETE',
    }).then(() => {
      // Direct Dependency authorization
      runInAction(() => {
        authorizationStore.user = null
      })
      localStorage.removeItem('user')
    })
  }
}

export const sessionStore = new SessionStore()
