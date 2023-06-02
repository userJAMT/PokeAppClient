import { useEffect, useRef, useState, useContext, useMemo } from 'react'
import { getPokemons, getPokemonsByName } from '../services/getPokemons.js'
import { FiltersContext } from '../context/filters.jsx'

export function usePokemons ({ query, sort }) {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState('')
  const { filters } = useContext(FiltersContext)
  const originalPokemons = useRef([])
  const previousQuery = useRef(query)

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
    console.log('searchPokemons')
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

  const resetPokemons = () => {
    setPokemons(originalPokemons.current)
    previousQuery.current = ''
  }

  const filteredPokemons = useMemo(() => {
    return pokemons?.filter(pokemon => {
      return (
        pokemon.attack >= filters.minAttack &&
        pokemon.attack <= filters.maxAttack &&
      (
        filters.types === 'all' ||
        pokemon.types.includes(filters.types)
      )
      )
    })
  }, [filters, pokemons])

  const sortedPokemons = useMemo(() => {
    return sort
      ? [...filteredPokemons].sort((a, b) => a.name.localeCompare(b.name))
      : filteredPokemons
  }, [sort, pokemons, filteredPokemons])

  return { pokemons: sortedPokemons, searchPokemons, resetPokemons, loading }
}
