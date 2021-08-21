import React from 'react'
import { User } from '../service/users'

export const Header: React.FC<{ user: User }> = ({ user }) => {
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
    </header>
  )
}
