import React from 'react'
import { useAppDispatch } from '../hooks'

import { exitUser } from './../store/features/user/userSlice'
import { User } from '../service/users'

export const Header: React.FC<{
  user: User | null
}> = ({ user }) => {
  const dispatch = useAppDispatch()

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div>{user?.login}</div>
      <img
        style={{ display: 'block', width: 60, height: 60, marginLeft: 10 }}
        src={user?.pic_url}
        alt={user?.login}
      />
      <button
        onClick={() => {
          dispatch(exitUser())
        }}
      >
        Exit
      </button>
    </header>
  )
}
