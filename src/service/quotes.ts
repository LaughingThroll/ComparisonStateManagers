import { makeRequestFavqs } from './makeRequestFavqs'
import { ServerError } from './types'

export interface WrapperQuotes {
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

export const getQuotes = (page?: number) => {
  return makeRequestFavqs<WrapperQuotes | ServerError>(
    `quotes?page=${page || 1}`
  )
}
