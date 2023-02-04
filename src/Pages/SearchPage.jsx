import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CardPokemon } from "../Components/CardPokemon";
import { pokemonContex } from "../context/PokemonContext";

export const SearchPage = () => {
  const location = useLocation();

  const { globalPokemons } = useContext(pokemonContex);
  console.log(location)

  const filteredPokemons = globalPokemons.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);
  
  return( 
  <div className="container">
    <p className="p-search">Se encontraron {filteredPokemons.length} Pokemons</p>
      <div className="card-list-pokemon container">
      { filteredPokemons.map (pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />)}
      </div>
  </div> 
  )
};
