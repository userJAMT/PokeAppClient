import { useState } from 'react'
import { usePokemons } from './hooks/usePokemons'
import { IS_DEVELOPMENT } from './config.js'
import { useSearchBar } from './hooks/useSearchBar'

import { Cards } from './components/Cards'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Filters } from './components/Filters'
import { SearchBar } from './components/SearchBar'

function App () {
  const [sort, setSort] = useState(false)
  const { query, resetQuery, queryError, setQuery } = useSearchBar()
  const { pokemons, searchPokemons, resetPokemons, loading } = usePokemons({ query, sort })

  const handleReset = () => {
    resetPokemons()
    resetQuery()
  }

  const handleSort = () => {
    setSort(!sort)
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
        <input type='checkbox' onChange={handleSort} value={sort} />
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
