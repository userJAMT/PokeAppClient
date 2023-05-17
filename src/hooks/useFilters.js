import { useContext } from 'react'
import { FiltersContext } from '../context/filters.jsx'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterPokemons = (pokemons) => {
    return pokemons.filter(pokemon => {
      return (
        pokemon.attack >= filters.minAttack &&
        (
          filters.types === 'all' ||
          pokemon.types.includes(filters.types)
        )
      )
    })
  }
  return { filters, setFilters, filterPokemons }
}
