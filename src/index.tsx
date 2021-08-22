import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { authorizationStore } from './store/Authorization'
import { signStore } from './store/Sign'

ReactDOM.render(
  <React.StrictMode>
    <App authorization={authorizationStore} sign={signStore} />
  </React.StrictMode>,
  document.getElementById('root')
)
