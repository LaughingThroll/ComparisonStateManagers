import React, { useState, ChangeEvent, MouseEvent } from 'react'
import { createUser, getUser } from './../service/users'
import { createSession } from './../service/session'
import { SessionDTO, UserLogin } from './../service/types'

interface SignUpProps {
  isSignUp: boolean
}

export const SignUp: React.FC<SignUpProps> = ({ isSignUp }) => {
  const [formValues, setFormValue] = useState<{
    [key: string]: string
  }>({
    login: '',
    email: '',
    password: '',
  })
  const { login, password, email } = formValues

  const resetValue = () => {
    setFormValue({
      login: '',
      email: '',
      password: '',
    })
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const userDTO: SessionDTO = {
      login,
      password,
    }

    if (isSignUp) {
      createUser({ email, ...userDTO }).then((res) => {
        console.log('created', res)
      })
    } else {
      getUser(userDTO).then((res) => {
        console.log('got', res)
      })
    }

    resetValue()
  }

  return (
    <form>
      <input
        value={login}
        name="login"
        onChange={handleOnChange}
        type="text"
        placeholder="Name"
      />
      {isSignUp && (
        <input
          value={email}
          name="email"
          onChange={handleOnChange}
          type="text"
          placeholder="Email"
        />
      )}
      <input
        value={password}
        name="password"
        onChange={handleOnChange}
        autoComplete="password"
        id="password"
        type="password"
        placeholder="Password"
      />

      <button
        type="submit"
        onClick={onSubmit}
        disabled={!login || (isSignUp && !email) || !password}
      >
        Sign {isSignUp ? 'Up' : 'In'}{' '}
      </button>
    </form>
  )
}
