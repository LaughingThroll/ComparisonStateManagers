import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { authorizationStore } from './store/Authorization'
import { signForm, SignForm } from './store/SignForm'

export const FormContext = createContext<SignForm>(signForm)

ReactDOM.render(
  <React.StrictMode>
    <FormContext.Provider value={signForm}>
      <App authorization={authorizationStore} />
    </FormContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
