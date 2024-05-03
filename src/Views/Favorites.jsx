import React from 'react'
import Header from '../layout/Header'
import PokeCard from '../Components/PokeCard'
import '../styles/Favoritos.css'

const DataR = () => {
  return (
    <div className="r">algo</div>
  )
}

const Favorites = () => {

  const irAHome = () => {
    location.href = '/';
  }

  return (
    <>
      <Header />
      <div className="botonAtras" onClick={irAHome} >
        Ir atrás
      </div>
      <div className='favoritos'>
        <div className="layoutFavoritos">
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
          <DataR />
        </div>
      </div>
    </>
  )
}

export default Favorites