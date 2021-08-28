import React, { useState, useEffect } from 'react'
import { Sign, UserPage, Header } from './components'
import { User } from './service/users'
import { useAppSelector, useAppDispatch } from './hooks'
import { getLocalUser } from './store/features/user/userSlice'

export const App = () => {
  const dispatch = useAppDispatch()
  const [isSingUp, setSingUp] = useState<boolean>(true)
  const {
    user: userRedux,
    isLoaded,
    error,
  } = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(getLocalUser())
  }, [dispatch])

  return (
    <div>
      {!userRedux && (
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
      {userRedux && (
        <>
          <Header user={userRedux} />
          <UserPage />
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}
