import React, { useState, ChangeEvent, MouseEvent } from 'react'
import { authorizationStore } from './../store/Authorization'
import { SessionDTO } from '../service/types'
import { SignStore } from '../store/Sign'
import { observer } from 'mobx-react-lite'

interface SignUpProps {
  signUp: SignStore
}

export const Sign: React.FC<SignUpProps> = observer(({ signUp }) => {
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

    if (signUp.signUp) {
      authorizationStore.createUser({ email, ...userDTO }).then(() => resetValue())
    } else {
      authorizationStore.getUser(userDTO).then(() => resetValue())
    }
  }

  return (
    <form>
      <input value={login} name="login" onChange={handleOnChange} type="text" placeholder="Name" />
      {signUp.signUp && <input value={email} name="email" onChange={handleOnChange} type="text" placeholder="Email" />}
      <input
        value={password}
        name="password"
        onChange={handleOnChange}
        autoComplete="password"
        id="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" onClick={onSubmit} disabled={!login || (signUp.signUp && !email) || !password}>
        {signUp.signPhrase}
      </button>
    </form>
  )
})
