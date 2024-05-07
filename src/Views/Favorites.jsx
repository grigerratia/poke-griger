import React, { useContext, useEffect, useState } from 'react'
import { getPokemon } from '../utils/getPokemon'
import Header from '../layout/Header'
import Charging from './Charging'
import PokeCard from '../Components/PokeCard'
import { MiContexto } from '../context/context'
import '../styles/Favoritos.css'

const DataR = ({ name }) => {
  return (
    <div className="r">{name}</div>
  )
}

const Favorites = () => {

  const context = useContext(MiContexto);
  const { favorites, setFavorites } = context
  const [listFavoritesPokemons, setListFavoritesPokemons] = useState([])
  const dataFavoritesPokemons = JSON.parse(localStorage.getItem("Favorites"))

  const goToHome = () => {
    location.href = '/';
  }

  useEffect(() => {
    dataFavoritesPokemons?.map(namePokemon => {
      getPokemon(namePokemon)
        .then(res => res.json())
        .then(data => setListFavoritesPokemons(listFavoritesPokemons.push(data)))
    });
    setFavorites(listFavoritesPokemons)
  }, [])

  return (
    <>
      <Header />
      <div className="botonAtras" onClick={goToHome} >
        Ir atrás
      </div>
      <div className='favoritos'>
        <div className="layoutFavoritos">
          {
            favorites?.map(pokemon => {
              return <DataR key={pokemon.name} name={pokemon.name} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default Favorites