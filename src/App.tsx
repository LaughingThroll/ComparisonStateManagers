import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Sign, QuotesList, Header } from './components'
import { AuthorizationStore } from './store/Authorization'
import { quotesStore } from './store/Quotes'
import { signStore } from './store/Sign'

export const App: React.FC<{ authorization: AuthorizationStore }> = observer(({ authorization }) => {
  useEffect(() => {
    authorization.getUserLocal()
  }, [authorization])

  return (
    <div>
      {authorization.isLoading && (
        <>
          <button
            onClick={() => {
              signStore.setSignUp(true)
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              signStore.setSignUp(false)
            }}
          >
            Sign In
          </button>

          <Sign signStore={signStore} />
        </>
      )}

      {!authorization.isLoading && (
        <>
          <Header />
          <QuotesList quotes={quotesStore} />
        </>
      )}
    </div>
  )
})
