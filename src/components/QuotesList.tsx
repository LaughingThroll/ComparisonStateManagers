import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { QuotesStore } from '../store/Quotes'
import { Quote } from './Quote'
import { appStore } from '../store/App'

export const QuotesList: React.FC<{ quotes: QuotesStore }> = observer(({ quotes }) => {
  useEffect(() => {
    quotes.getQuotes()
  }, [quotes])

  const styles = { backgroundColor: '#ff4455', color: '#fff', fontWeight: 900, marginLeft: 20, cursor: 'pointer' }

  return (
    <div>
      <div>
        {quotes.moreQuotes ? 'Create Quotes' : 'DESTROY THIS APP'}
        <button
          style={quotes.moreQuotes ? {} : styles}
          onClick={quotes.moreQuotes ? quotes.addQuote : appStore.DESTROY_THIS_APP}
        >
          {quotes.moreQuotes ? 'Add Quote' : 'DONT TOUCH'}
        </button>
      </div>

      <div>
        All list
        <ul>
          {quotes.quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </ul>
      </div>
    </div>
  )
})
