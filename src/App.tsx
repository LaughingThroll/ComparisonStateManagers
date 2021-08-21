import React, { useState } from 'react'
import { Sign, UserPage, Header } from './components'
import { User } from './service/users'

export const App = () => {
  const [isSingUp, setSingUp] = useState<boolean>(true)
  const [user, setUser] = useState<User>()

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

          <Sign setCurrentUser={(user) => setUser(user)} isSignUp={isSingUp} />
        </>
      )}
      {user && (
        <>
          <Header user={user} />
          <UserPage />
        </>
      )}
    </div>
  )
}
