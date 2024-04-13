import React, { useContext, useState, useEffect } from "react"
import { MiContexto } from "../context/context"

const Evolutions = () => {

  const evolStyles = { border: "solid 1px #484747", borderRadius: "8px" }
  const evolImgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"
  const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

  const context = useContext(MiContexto)
  const { setDataCard, evolChainGot, idDataCard } = context
  const [evolutions, setEvolutions] = useState(evolChainGot)
  const id = idDataCard

  useEffect(() => {
    setEvolutions(evolChainGot)
  }, [evolutions])

  //CAMBIA EL POKEMON DE LA CADENA DE EVOLUCIÓN DQUE SE SELECCIONA
  const cambiarEvol = (p) => {
    setDataCard(p)
  }

  return (
    <div className="evolucionContainer">
      {
        evolChainGot?.sort((a, b) => a.id - b.id)?.map((pokemon) =>
        (
          <div className='evolucion'
            key={pokemon?.id}
            style={pokemon?.id === id ? evolStyles : null}
            onClick={() => cambiarEvol(pokemon)}
          >
            <div className='evolucion-circulo'>
              <figure>
                <img
                  src={evolImgURL + pokemon?.id + ".gif"}
                  alt=''
                />
              </figure>
            </div>
            <div className='evolucion-datos'>
              <div className='evolucion-datos--nombre' >{pokemon?.name}</div>
            </div>
          </div>
        )
        )
      }
    </div>
  )
}

export default Evolutions


