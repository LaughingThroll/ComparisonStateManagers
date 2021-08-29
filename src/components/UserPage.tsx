import React, { useEffect, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'

import {
  addQuote,
  fecthQuotes,
  selectQuotes,
} from '../store/slices/quotes/quotesSlice'
import { exitUser } from '../store/slices/user/userSlice'

export const UserPage = () => {
  const dispatch = useAppDispatch()
  const { quotes, isLoaded, error } = useAppSelector(selectQuotes)

  useEffect(() => {
    dispatch(fecthQuotes())
  }, [dispatch])

  const DESTROY_APP = useCallback(() => {
    dispatch(exitUser())
  }, [dispatch])

  useEffect(() => {
    if (quotes.length >= 41) {
      setTimeout(DESTROY_APP, 2000)
    }
  }, [quotes.length, DESTROY_APP])

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <>
      {quotes.length >= 41 ? (
        <div style={{ fontSize: 50, fontWeight: 900 }}>
          FUCK YOU !!! Fucking people!
        </div>
      ) : (
        <div>
          All list
          {quotes.length > 30 &&
            quotes.length <= 35 &&
            " More qoutes. Please you don't need it "}
          {quotes.length > 35 &&
            quotes.length <= 40 &&
            ' Stop!! Very More qoutes '}
          {quotes.length > 40 &&
            quotes.length <= 40 &&
            " I'm sick of you. Don't touch this button "}
          <button onClick={() => dispatch(addQuote())}>Add Quote</button>
          <ul>
            {quotes.map((quote, idx) => {
              return (
                <li key={quote?.id || idx} style={{ marginBottom: 10 }}>
                  <div>{quote?.body}</div>
                  <div>{quote?.author}</div>
                </li>
              )
            })}
          </ul>
          {error && <div>{error}</div>}
        </div>
      )}
    </>
  )
}
