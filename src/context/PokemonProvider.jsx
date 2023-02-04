import { useEffect, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { pokemonContex } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [offset, setoffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);

  //Formulario de busqueda con customHook 
  const {valueSerch, onInputChangue, onResertForm }= useForm({
    valueSerch:''
  })

  //Estados de la aplicacion

  const [loading, setLoading] = useState(true)

  // Para el filtrado
  const [active, setActive] = useState(false)


  // Llamar  todos los pokemosnes con then
  const getGlobalPokemons = async () => {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await response.json();
    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    });

    const results = await Promise.all(promises);
    setGlobalPokemons(results);
    setLoading(false)

  };

  const getAllPokemonsAs = async (limit = 50) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      return data;
    });

    const results = await Promise.all(promises);
    setAllPokemons([...allPokemons,...results]);
    setLoading(false)
  };

  // Llamar Pokemon por id

  const getAlllPokemonById = async (id) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    getAllPokemonsAs();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <pokemonContex.Provider
      value={{
        onInputChangue,
        valueSerch,
        onResertForm,
        allPokemons,
        globalPokemons,
        getAlllPokemonById
      }}
    >
      {children}
    </pokemonContex.Provider>
  );
};
