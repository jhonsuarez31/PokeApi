import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navigation } from '../Components/Navigation'
import { HomePage, PokemonPage, SearchPage } from '../Pages'

export const AppRoutes = () => {
  return (
   <>
    <Routes>
        <Route path='/' element={<Navigation/>}>
            <Route index element={<HomePage/>} />
            <Route path='pokemon/:id' element ={<PokemonPage/>}/>
            <Route path='search' element={<SearchPage/>} />
        </Route>

        <Route path='*' element={<Navigate to={'/'}/>}/>
    </Routes>
   </>
  )
}
