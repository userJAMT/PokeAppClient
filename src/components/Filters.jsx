import React, { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import { types } from '../mocks/types.json'
import './Filters.css'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const minAttackFilterId = useId()
  const typeFilterId = useId()

  const handleChangeMinAttack = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minAttack: event.target.value
    }))
  }

  const handleChangeType = (event) => {
    setFilters(prevState => ({
      ...prevState,
      types: event.target.value
    }))
  }

  return (
    <section className='filters'>

      <div className='rangeFilter'>
        <label htmlFor='minAttack'>Attack</label>
        <input
          type='range'
          id={minAttackFilterId}
          min='0'
          max='103'
          onChange={handleChangeMinAttack}
          value={filters.minAttack}
        />
        <span>{filters.minAttack}</span>
      </div>

      <div>
        <label htmlFor='type'>Types</label>
        <select id={typeFilterId} onChange={handleChangeType}>
          <option value='all'>Todos</option>
          {types?.map(type => (
            <option value={type.name} key={type.id}>{type.name}</option>
          ))}
          <option />
        </select>
      </div>

    </section>
  )
}
