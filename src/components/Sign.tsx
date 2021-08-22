import React, { MouseEvent, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { authorizationStore } from './../store/Authorization'
import { SessionDTO } from '../service/types'
import { SignStore } from '../store/Sign'
import { FormContext } from './../index'

interface SignUpProps {
  signStore: SignStore
}

export const Sign: React.FC<SignUpProps> = observer(({ signStore }) => {
  const {
    userForm: { login, email, password },
    isDisabled,
    resetValue,
    onChange,
  } = useContext(FormContext)

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const userDTO: SessionDTO = {
      login,
      password,
    }

    signStore.signUp && (await authorizationStore.createUser({ email, ...userDTO }))
    !signStore.signUp && (await authorizationStore.getUser(userDTO))

    resetValue()
  }

  return (
    <form>
      <input value={login} name="login" onChange={onChange} type="text" placeholder="Name" />
      {signStore.signUp && <input value={email} name="email" onChange={onChange} type="text" placeholder="Email" />}
      <input
        value={password}
        name="password"
        onChange={onChange}
        autoComplete="password"
        id="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" onClick={onSubmit} disabled={isDisabled}>
        {signStore.signPhrase}
      </button>
    </form>
  )
})
