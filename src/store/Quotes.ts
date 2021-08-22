import { action, computed, flow, makeObservable, observable, runInAction } from 'mobx'
import { makeRequestFavqs } from './../service/makeRequestFavqs'

interface WrapperQuotes {
  page: number
  last_page: boolean
  quotes: Quote[]
}

export interface Quote {
  id: number
  tags: string[]
  favorite: boolean
  author_permalink: string
  body: string
  favorites_count: number
  upvotes_count: number
  downvotes_count: number
  dialogue: boolean
  author: string
  url: string
}

export class QuotesStore {
  quotes: Quote[] = []

  constructor() {
    makeObservable(this, {
      quotes: observable,
      addQuote: action,
      getQuotes: flow,
      moreQuotes: computed,
    })
  }

  *getQuotes(page?: number) {
    const response: WrapperQuotes = yield makeRequestFavqs<WrapperQuotes>(`quotes?page=${page || 1}`)

    runInAction(() => {
      this.quotes = response.quotes
    })
  }

  addQuote = () => {
    const quote: Partial<Quote> = {
      id: 45678987,
      body: 'Maybe better be than not be, but i can wrong',
      author: 'Kostia',
    }

    this.quotes.unshift(quote as Quote)
  }

  get moreQuotes() {
    return this.quotes.length <= 30
  }
}

export const quotesStore = new QuotesStore()
