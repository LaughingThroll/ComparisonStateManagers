import React from 'react'
import { Quote as IQuote } from './../store/Quotes'

export const Quote: React.FC<{ quote: IQuote }> = ({ quote }) => {
  return (
    <li style={{ marginBottom: 10 }}>
      <div>{quote?.body}</div>
      <div>{quote?.author}</div>
    </li>
  )
}
