import React, { useContext } from 'react'
import { pokemonContex } from '../context/PokemonContext'
import { CardPokemon } from './CardPokemon'

export const PokemonList = () => {
  const {allPokemons} = useContext(pokemonContex)
  
  return (
    <>
      <div className='card-list-pokemon container'>
      {
       allPokemons.map( pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)
      }
      </div>
    </>
  )
}
