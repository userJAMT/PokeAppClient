import { createContext, useState } from 'react'

export const FiltersContext = createContext()

export function FiltersProvider ({ children }) {
  const [filters, setFilters] = useState({
    types: 'all',
    minAttack: 0
  })

  const [sorts, setSorts] = useState({
    order: 'default',
    orderBy: 'default'
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters,
      sorts,
      setSorts
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
