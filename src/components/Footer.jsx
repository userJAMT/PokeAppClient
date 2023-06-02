import { useContext } from 'react'
import './Footer.css'
import { FiltersContext } from '../context/filters'

export function Footer () {
  const { filters } = useContext(FiltersContext)
  return (
    <footer className='footer'>
      {
        JSON.stringify(filters, null, 2)
      }
    </footer>
  )
}
