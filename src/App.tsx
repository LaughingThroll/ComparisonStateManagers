import React, { useState, useEffect } from 'react'
import { SignUp } from './components'
import { closeSession } from './service/session'

export const App = () => {
  const [isSingUp, setSingUp] = useState<boolean>(true)

  useEffect(() => {
    closeSession()
  }, [])

  return (
    <div>
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

      <SignUp isSignUp={isSingUp} />
    </div>
  )
}
