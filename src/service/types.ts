export interface SuccessLogin {
  'User-Token': string
  login: string
}

export interface ServerError {
  error_code: number
  message: string
}

export interface UserLogin {
  login: string
  email: string
  password: string
}

export type SessionDTO = Omit<UserLogin, 'email'>
