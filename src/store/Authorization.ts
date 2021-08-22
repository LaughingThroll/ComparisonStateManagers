import { makeAutoObservable, runInAction } from 'mobx'
import { makeRequestFavqs } from '../service/makeRequestFavqs'
import { sessionStore } from './Session'
import { SuccessLogin, ServerError, UserLogin, SessionDTO } from './../service/types'

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
  isLoading: boolean | null = null

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
    // Direct Dependency session
    this.isLoading = true
    const response = await sessionStore.createSession(user)

    if ('login' in response) {
      const userResponse = await this.getUserHelper(response.login, response['User-Token'])

      runInAction(() => {
        this.user = userResponse
        this.isLoading = false
      })

      localStorage.setItem('user', JSON.stringify(userResponse))
      return
    }

    console.log('error_code in session', response)
  }

  getUserLocal() {
    const localUser = localStorage.getItem('user')

    if (localUser) {
      runInAction(() => {
        this.user = JSON.parse(localUser)
      })
    }
  }

  private getUserHelper = async (login: string, token: string) => {
    const userResponse = await makeRequestFavqs<User>(`users/${login}`, {
      headers: { 'User-Token': token },
    })

    return userResponse
  }
}

export const authorizationStore = new AuthorizationStore()
