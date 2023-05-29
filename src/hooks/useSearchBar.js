import { useEffect, useRef, useState } from 'react'

export function useSearchBar () {
  const [query, setQuery] = useState('')
  const [queryError, setQueryError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
    } else if (!query.match(/^[a-zA-Z]*$/)) {
      setQueryError('Only letters allowed')
    } else if (query === '') {
      setQueryError('You have to put a name to search')
    } else {
      setQueryError(null)
    }
  }, [query])

  const resetQuery = () => {
    setQuery('')
    setQueryError(null)
    isFirstInput.current = true
  }

  return { query, setQuery, queryError, resetQuery }
}
