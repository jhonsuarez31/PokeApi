import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AppRoutes } from './Routes/AppRoutes'
import { PokemonProvider } from './context/PokemonProvider'
function App() {

  return (
    <>
      <PokemonProvider>
        <AppRoutes/>
      </PokemonProvider>
      
    </>
  )
}

export default App
