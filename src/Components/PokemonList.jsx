import React, { useContext } from "react";
import { pokemonContex } from "../context/PokemonContext";
import { CardPokemon } from "./CardPokemon";
import { Loader } from "./Loader";

export const PokemonList = () => {
  const { allPokemons, loading, filterPokemons } = useContext(pokemonContex);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">{
          filterPokemons.length ? (
            <>
            {filterPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.id} />
          ))}

          </>
          ):
          <>
          {allPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.id} />
          ))}
          </> 
          }
    
        </div>
      )}
    </>
  );
};
