import { useState } from 'react'
import { useFilters } from './useFilters.js'
import { pokemons as initialPokemons } from '../mocks/pokemons.json'

export function usePokemons () {
  const [pokemons] = useState(initialPokemons)

  const mappedPokemons = pokemons.map(pokemon => (
    ({ ...pokemon, types: pokemon.types.map(type => type.name) })
  ))

  const { filterPokemons } = useFilters()

  const filteredPokemons = filterPokemons(mappedPokemons)

  return filteredPokemons
}
