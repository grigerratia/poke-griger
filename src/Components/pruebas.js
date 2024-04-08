import axios from "axios";

const url = "https://pokeapi.co/api/v2/pokemon/charizard"

const obtenerPokemon = async() => {
  const respuesta = await axios.get(url)
  const datosPokemon = respuesta.data
  console.log(
    `${datosPokemon.name} es el Pokemon número: ${datosPokemon.id}
en la pokedex. Y es un pokemon de tipo: ${datosPokemon.types[0].type.name}.` );
}
obtenerPokemon()