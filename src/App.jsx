import { useState } from 'react'
import { Cards } from './components/Cards'
import { pokemons as initialPokemons } from './mocks/pokemons.json'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters'

function App () {
  const [pokemons] = useState(initialPokemons)

  const mappedPokemons = pokemons.map(pokemon => (
    ({ ...pokemon, types: pokemon.types.map(type => type.name) })
  ))

  const { filterPokemons } = useFilters()

  const filteredPokemons = filterPokemons(mappedPokemons)

  return (
    <>
      <Header />
      <Cards pokemons={filteredPokemons} />
      {IS_DEVELOPMENT && <Footer />}
    </>
  )
}

export default App
