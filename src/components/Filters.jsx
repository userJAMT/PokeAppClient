import React, { useContext, useId } from 'react'
import { types } from '../mocks/types.json'
import './Filters.css'
import { FiltersContext } from '../context/filters'
import { MultiRangeSlider } from './MultiRangeSlider'

export function Filters () {
  const { setFilters } = useContext(FiltersContext)
  const attackFilterId = useId()
  const typeFilterId = useId()

  const handleChange = ({ min, max, id }) => {
    if (attackFilterId === id) {
      setFilters(prevState => ({
        ...prevState,
        minAttack: min,
        maxAttack: max
      }))
    }
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
        <div>
          <MultiRangeSlider
            id={attackFilterId}
            min={0}
            max={110}
            onChange={handleChange}
          />
        </div>
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
