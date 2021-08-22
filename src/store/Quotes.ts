import { makeAutoObservable, runInAction } from 'mobx'
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
    makeAutoObservable(this)
  }

  async getQuotes(page?: number) {
    const response = await makeRequestFavqs<WrapperQuotes>(`quotes?page=${page || 1}`)
    runInAction(() => {
      this.quotes = response.quotes
    })
  }
}

export const qoutesStore = new QuotesStore()
