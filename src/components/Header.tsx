import React from 'react'
import { closeSession } from '../service/session'
import { User } from '../service/users'

export const Header: React.FC<{
  user: User
  setCurrentUser: (user: User | null) => void
}> = ({ user, setCurrentUser }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div>{user.login}</div>
      <img
        style={{ display: 'block', width: 60, height: 60, marginLeft: 10 }}
        src={user.pic_url}
        alt={user.login}
      />
      <button
        onClick={() => {
          closeSession()
          setCurrentUser(null)
        }}
      >
        Exit
      </button>
    </header>
  )
}
