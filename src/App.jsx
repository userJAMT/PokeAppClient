import { Cards } from './components/Cards'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Filters } from './components/Filters'
import { SearchBar } from './components/SearchBar'

import { usePokemons } from './hooks/usePokemons'
import { IS_DEVELOPMENT } from './config.js'
import { useSearchBar } from './hooks/useSearchBar'

function App () {
  const { query, resetQuery, queryError, setQuery } = useSearchBar()
  const { pokemons, searchPokemons, resetPokemons, loading } = usePokemons({ query })

  const handleReset = () => {
    resetPokemons()
    resetQuery()
  }

  return (
    <>
      <Header>
        <SearchBar
          searchPokemons={searchPokemons}
          setQuery={setQuery}
          queryError={queryError}
          query={query}
        />
        <button onClick={handleReset}>Reload</button>
        <Filters />
      </Header>
      {loading
        ? <p>cargando...</p>
        : <Cards pokemons={pokemons} />}
      {IS_DEVELOPMENT && <Footer />}
    </>
  )
}

export default App
