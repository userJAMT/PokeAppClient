import { useState } from 'react'
import { getPokemonsByName } from '../services/getPokemons'

export function useSearch () {
  const [loading, setLoading] = useState(false)
  const [, setError] = useState('')

  const search = async (query) => {
    try {
      setLoading(true)
      setError(null)
      const newPokemons = await getPokemonsByName({ query })
      return newPokemons
    } catch (error) {
      setError(error.message)
      return []
    } finally {
      setLoading(false)
    }
  }

  return { search, loading }
}
