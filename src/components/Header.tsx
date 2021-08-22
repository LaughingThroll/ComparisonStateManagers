import React from 'react'
import { observer } from 'mobx-react-lite'
import { authorizationStore } from '../store/Authorization'

// It's way bad for unit-testing
export const Header: React.FC = observer(() => {
  const { user, closeSession } = authorizationStore

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
      <button onClick={closeSession}>Exit</button>
    </header>
  )
})
