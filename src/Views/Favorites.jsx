import React, { useContext, useEffect, useState } from 'react'
import { getPokemon } from '../utils/getPokemon'
import Header from '../layout/Header'
import { MiContexto } from '../context/context'
import PreferCard from '../layout/PreferCard'
import '../styles/Favoritos.css'

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
            favorites?.map(elem => {
              return <PreferCard key={elem.name} pokemon={elem} />
            })
          }
        </div>
      </div>
    </>
  )
}

export default Favorites