import './Cards.css'

function WithResults ({ pokemons }) {
  return (
    <main className='cards'>
      <ul>
        {pokemons?.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.img} alt={pokemon.name} />
            <div>
              <strong>{pokemon.name}</strong>
            </div>
            <div className='types-wrapper'>
              {pokemon.types.map(type => (
                <div key={`${pokemon.id} ${type}`} className={`icon ${type}`}>
                  <img src={`src/icons/${type}.svg`} />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

function WithoutResults () {
  return (
    <p>No se encontraron pokemons...</p>
  )
}

export function Cards ({ pokemons }) {
  const hasPokemons = pokemons?.length > 0
  return (
    <>
      {hasPokemons
        ? <WithResults pokemons={pokemons} />
        : <WithoutResults />}
    </>
  )
}
