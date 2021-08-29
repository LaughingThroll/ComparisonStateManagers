import React, { useState, useEffect } from 'react'
import { Sign, UserPage, Header } from './components'
import { useAppSelector, useAppDispatch } from './hooks'
import { getLocalUser, selectUser } from './store/slices/user/userSlice'

export const App = () => {
  const dispatch = useAppDispatch()
  const [isSingUp, setSingUp] = useState<boolean>(true)
  const { user, isLoaded, error } = useAppSelector(selectUser)

  useEffect(() => {
    dispatch(getLocalUser())
  }, [dispatch])

  return (
    <div>
      {!user && (
        <>
          <button
            onClick={() => {
              setSingUp(true)
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setSingUp(false)
            }}
          >
            Sign In
          </button>

          <Sign isSignUp={isSingUp} />
        </>
      )}
      {user && (
        <>
          <Header user={user} />
          <UserPage />
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}
