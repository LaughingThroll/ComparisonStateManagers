export const makeRequest = <T>(
  URL: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(URL, options)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
    })
}
