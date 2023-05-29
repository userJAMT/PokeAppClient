import { useEffect, useRef, useState } from 'react'
import { useFilters } from './useFilters.js'
import { getPokemons } from '../services/getPokemons.js'
import { useSearch } from './useSearch.js'
import { useSorts } from './useSorts.js'

export function usePokemons ({ query }) {
  const [pokemons, setPokemons] = useState([])
  const originalPokemons = useRef([])
  const previousQuery = useRef(query)

  const { search, loading } = useSearch()
  const { filterPokemons } = useFilters()
  const { sortPokemons } = useSorts()

  useEffect(() => {
    getPokemons()
      .then(res => {
        setPokemons(res)
        originalPokemons.current = res
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const searchPokemons = async () => {
    if (query === '' || previousQuery.current === query) return
    previousQuery.current = query
    const newPokemons = await search(query)
    setPokemons(newPokemons)
  }

  const resetPokemons = () => {
    setPokemons(originalPokemons.current)
    previousQuery.current = ''
  }

  const filteredPokemons = filterPokemons(pokemons)
  const sortedPokemons = sortPokemons(filteredPokemons)

  return { pokemons: sortedPokemons, searchPokemons, resetPokemons, loading }
}
