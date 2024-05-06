import React, { useContext, useEffect, useState } from 'react'
import { getPokemon } from '../utils/getPokemon'
import Header from '../layout/Header'
import Charging from './Charging'
import PokeCard from '../Components/PokeCard'
import { MiContexto } from '../context/context'
import '../styles/Favoritos.css'

const DataR = (name) => {
  return (
    <div className="r">[{name}]</div>
  )
}

const Favorites = () => {

  const context = useContext(MiContexto);
  const { allPokemons, favorites, setFavorites } = context
  const [listFavoritesPokemons, setListFavoritesPokemons] = useState([])

  const irAHome = () => {
    location.href = '/';
  }

  const dataFavoritesPokemons = JSON.parse(localStorage.getItem("Favorites"))
  dataFavoritesPokemons.map(namePokemon => {
    getPokemon(namePokemon)
      .then(res => res.json())
      .then(data => {
        setListFavoritesPokemons([...listFavoritesPokemons].push(data))
      })
  });

  return (
    <>
      <Header />
      <div className="botonAtras" onClick={irAHome} >
        Ir atrás
      </div>
      <div className='favoritos'>
        <div className="layoutFavoritos">
          {
            console.log(listFavoritesPokemons)
          }
        </div>
      </div>
    </>
  )
}

export default Favorites