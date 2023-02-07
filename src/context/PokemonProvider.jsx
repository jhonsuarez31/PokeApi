import { useEffect, useState } from "react";
import { useForm } from "../Hooks/useForm";
import { pokemonContex } from "./PokemonContext";

export const PokemonProvider = ({ children }) => {
  const [offset, setoffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);

  //Formulario de busqueda con customHook
  const { valueSerch, onInputChangue, onResertForm } = useForm({
    valueSerch: "",
  });

  //Estados de la aplicacion

  const [loading, setLoading] = useState(true);

  // Para el filtrado
  const [active, setActive] = useState(false);

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
    setLoading(false);
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
    setAllPokemons([...allPokemons, ...results]);
    setLoading(false);
  };

  // Llamar Pokemon por id

  const getAlllPokemonById = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getAllPokemonsAs();
  }, [offset]);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  const onClickLoadMore = () => {
    setoffset(offset + 50);
  };

  // Filter functions

  const [filterPokemons, setfilterPokemons] = useState([]);
  const [typePokemon, settypePokemon] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false,
  });

  const handleCheckedBox = (event) => {
    settypePokemon({
      ...typePokemon,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      const filterResults = globalPokemons.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(event.target.name)
      );
      setfilterPokemons([...filterPokemons, ...filterResults])
    }
    else{
      const filterResults = filterPokemons.filter((pokemon) =>
      !pokemon.types.map((type) => type.type.name).includes(event.target.name)
    );
    setfilterPokemons([ ...filterResults])
    }
  };

  return (
    <pokemonContex.Provider
      value={{
        onInputChangue,
        valueSerch,
        onResertForm,
        allPokemons,
        globalPokemons,
        getAlllPokemonById,
        onClickLoadMore,
        loading,
        active,
        setActive,
        handleCheckedBox, 
        filterPokemons,
      }}
    >
      {children}
    </pokemonContex.Provider>
  );
};
