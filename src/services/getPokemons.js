export const getPokemons = async () => {
  try {
    const responsePokemons = await fetch('http://localhost:3001/pokemons')
    const pokemons = await responsePokemons.json()
    return pokemons?.map(pokemon => (
      ({ ...pokemon, types: pokemon.types.map(type => type.name) })
    ))
  } catch (error) {
    throw new Error('Error searching Pokemons')
  }
}

export const getPokemonsByName = async ({ query }) => {
  try {
    const responsePokemons = await fetch(`http://localhost:3001/pokemons?name=${query}`)
    const pokemons = await responsePokemons.json()
    return pokemons?.map(pokemon => (
      ({ ...pokemon, types: pokemon.types.map(type => type.name) })
    ))
  } catch (error) {
    throw new Error('Error searching by name')
  }
}
