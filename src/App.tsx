import React, { useState, useEffect } from 'react'
import { Sign, UserPage, Header } from './components'
import { User } from './service/users'

export const App = () => {
  const [isSingUp, setSingUp] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const localUser = localStorage.getItem('user')

    if (localUser) {
      setUser(JSON.parse(localUser))
    }
  }, [])

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

          <Sign setCurrentUser={setUser} isSignUp={isSingUp} />
        </>
      )}
      {user && (
        <>
          <Header setCurrentUser={setUser} user={user} />
          <UserPage />
        </>
      )}
    </div>
  )
}
