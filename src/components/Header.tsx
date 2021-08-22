import React from 'react'
import { observer } from 'mobx-react-lite'
import { User } from '../store/Authorization'
import { SessionStore } from './../store/Session'

export const Header: React.FC<{ user: User | null; session: SessionStore }> = observer(({ user, session }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <div>{user?.login}</div>
      <img style={{ display: 'block', width: 60, height: 60, marginLeft: 10 }} src={user?.pic_url} alt={user?.login} />
      <button onClick={session.closeSession}>Exit</button>
    </header>
  )
})
