import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { QuotesStore } from '../store/Quotes'
import { Quote } from './Quote'

export const QuotesList: React.FC<{ quotes: QuotesStore }> = observer(({ quotes }) => {
  useEffect(() => {
    quotes.getQuotes()
  }, [quotes])

  return (
    <div>
      All list
      <ul>
        {quotes.quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </ul>
    </div>
  )
})
