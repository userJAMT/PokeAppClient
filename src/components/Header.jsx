import React from 'react'

export function Header ({ children }) {
  return (
    <header>
      <h1>PokeApp</h1>
      {children}
    </header>
  )
}
