import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'

import { fecthQuotes, selectQuotes } from '../store/slices/quotes/quotesSlice'

export const UserPage = () => {
  const dispatch = useAppDispatch()
  const { quotes, isLoaded, error } = useAppSelector(selectQuotes)

  useEffect(() => {
    dispatch(fecthQuotes())
  }, [dispatch])

  return !isLoaded ? (
    <div>Loading...</div>
  ) : (
    <div>
      All list
      <ul>
        {quotes.map((quote) => {
          return (
            <li key={quote?.id} style={{ marginBottom: 10 }}>
              <div>{quote?.body}</div>
              <div>{quote?.author}</div>
            </li>
          )
        })}
      </ul>
      {error && <div>{error}</div>}
    </div>
  )
}
