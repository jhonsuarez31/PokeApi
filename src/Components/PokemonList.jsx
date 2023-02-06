import React, { useContext } from "react";
import { pokemonContex } from "../context/PokemonContext";
import { CardPokemon } from "./CardPokemon";
import { Loader } from "./Loader";

export const PokemonList = () => {
  const { allPokemons, loading } = useContext(pokemonContex);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card-list-pokemon container">
          {allPokemons.map((pokemon) => (
            <CardPokemon pokemon={pokemon} key={pokemon.id} />
          ))}
        </div>
      )}
    </>
  );
};
