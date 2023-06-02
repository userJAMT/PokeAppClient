import './SearchBar.css'

export function SearchBar ({ searchPokemons, setQuery, queryError, query }) {
  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(newQuery)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    searchPokemons()
  }

  return (
    <>
      <form className='searchForm' onSubmit={handleSubmit}>
        <input
          className='input'
          onChange={handleChange}
          value={query}
          style={{ border: queryError && 'solid 1px red' }}
          placeholder='Bulbasaur, Squirtle, 1...'
        />
        <button disabled={queryError} type='submit'>Search</button>
      </form>
      {queryError
        ? <span style={{ color: 'red' }}>{queryError}</span>
        : <br />}
    </>
  )
}
