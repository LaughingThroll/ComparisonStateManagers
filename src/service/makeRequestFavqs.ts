import { makeRequest } from './utils'
import { BASE_URL, API_KEY } from './constant'

export const makeRequestFavqs = <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return makeRequest<T>(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token token=${API_KEY}`,
      ...options?.headers,
    },
  })
}
