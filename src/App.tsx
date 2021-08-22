import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Sign, QuotesList, Header } from './components'
import { AuthorizationStore } from './store/Authorization'
import { SignStore } from './store/Sign'
import { sessionStore } from './store/Session'
import { qoutesStore } from './store/Quotes'

export const App: React.FC<{ authorization: AuthorizationStore; sign: SignStore }> = observer(
  ({ authorization, sign }) => {
    useEffect(() => {
      authorization.getUserLocal()
    }, [authorization])

    return (
      <div>
        {!authorization.user && (
          <>
            <button
              onClick={() => {
                sign.setSignUp(true)
              }}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                sign.setSignUp(false)
              }}
            >
              Sign In
            </button>

            <Sign signUp={sign} />
          </>
        )}

        {authorization.user && (
          <>
            <Header session={sessionStore} user={authorization.user} />
            <QuotesList quotes={qoutesStore} />
          </>
        )}
      </div>
    )
  }
)
