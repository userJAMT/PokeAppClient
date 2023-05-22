import { useEffect, useRef, useState } from 'react'
import { useFilters } from './useFilters.js'
import { getPokemons, getPokemonsByName } from '../services/getPokemons.js'

export function usePokemons ({ query }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState('')

  const originalPokemons = useRef([])
  const previousQuery = useRef(query)

  const { filterPokemons } = useFilters()

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

  const resetPokemons = () => {
    setPokemons(originalPokemons.current)
  }

  const searchPokemons = async () => {
    if (query === '' || previousQuery.current === query) return
    try {
      setLoading(true)
      setError(null)
      previousQuery.current = query
      const newPokemons = await getPokemonsByName({ query })
      setPokemons(newPokemons)
    } catch (error) {
      setError(error.message)
      setPokemons([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPokemons = filterPokemons(pokemons)

  return { pokemons: filteredPokemons, searchPokemons, resetPokemons, loading }
}
