import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  useRef,
} from 'react'
import { createUser, getUser, User } from '../service/users'
import { SessionDTO } from '../service/types'

interface SignUpProps {
  isSignUp: boolean
  setCurrentUser: (user: User) => void
}

export const Sign: React.FC<SignUpProps> = ({ isSignUp, setCurrentUser }) => {
  const unmounted = useRef(false)
  useEffect(() => {
    return () => {
      unmounted.current = true
    }
  }, [])

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
      createUser({ email, ...userDTO })
    } else {
      getUser(userDTO).then((user) => {
        !unmounted.current && user && setCurrentUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        resetValue()
      })
    }
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
