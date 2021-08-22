import { makeAutoObservable, runInAction } from 'mobx'
import { makeRequestFavqs } from '../service/makeRequestFavqs'
import { SuccessLogin, ServerError, UserLogin, SessionDTO } from './../service/types'

interface SuccessSession extends SuccessLogin {
  email: string
}

export interface User {
  login: string
  pic_url: string
  public_favorites_count: number
  followers: number
  following: number
  pro: boolean
}

export class AuthorizationStore {
  user: User | null = null
  isLoading: boolean = true
  error: ServerError | null = null

  constructor() {
    makeAutoObservable(this)
  }

  createUser(user: UserLogin) {
    return makeRequestFavqs<SuccessLogin | ServerError>(`users`, {
      method: 'POST',
      body: JSON.stringify({ user }),
    })
  }

  async getUser(user: SessionDTO) {
    this.isLoading = true

    const response = await this.createSession(user)

    if ('login' in response) {
      const userResponse = await this.getUserHelper(response.login, response['User-Token'])

      runInAction(() => {
        this.user = userResponse
        this.isLoading = false
      })

      localStorage.setItem('user', JSON.stringify(userResponse))
      return
    }

    runInAction(() => {
      this.error = response
    })

    console.error('error_code in session')
  }

  getUserLocal() {
    const localUser = localStorage.getItem('user')

    if (localUser) {
      runInAction(() => {
        this.user = JSON.parse(localUser)
        this.isLoading = false
      })
    }
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
      runInAction(() => {
        this.user = null
        this.isLoading = true
      })
      localStorage.removeItem('user')
    })
  }

  private getUserHelper = async (login: string, token: string) => {
    const userResponse = await makeRequestFavqs<User>(`users/${login}`, {
      headers: { 'User-Token': token },
    })

    return userResponse
  }
}

export const authorizationStore = new AuthorizationStore()
