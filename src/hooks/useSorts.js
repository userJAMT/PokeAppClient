import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useSorts () {
  const { sorts, setSorts } = useContext(FiltersContext)
  const sortPokemons = (pokemons) => {
    return pokemons
  }

  return { sorts, setSorts, sortPokemons }
}
