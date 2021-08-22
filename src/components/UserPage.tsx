import React, { useEffect, useState } from 'react'
import { getQuotes, Quote } from '../service/quotes'

export const UserPage = () => {
  const [quotes, setQuotes] = useState<Quote[]>([])

  useEffect(() => {
    getQuotes().then((res) => {
      setQuotes(res.quotes)
    })
  }, [])

  return (
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
    </div>
  )
}
