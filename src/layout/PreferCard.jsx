import React, { useEffect, useState } from "react";
import "../styles/PokeCard.css";

const PreferCard = ({ pokemon }) => {

  const [image, setImage] = useState("");
  const { name, types, abilities } = pokemon;

  useEffect(() => {
    pokemon.sprites.other["showdown"].front_default
      ? setImage(pokemon.sprites.other["showdown"].front_default)
      : setImage(pokemon.sprites.other["official-artwork"].front_default)
  }, [])

  return (
    <>
      <div
        key={types[0]?.type.name}
        className={"content-card" + " " + types[0]?.type.name}>
        <picture>
          <img src={image} alt={name} />
        </picture>
        <div className='card-details'>
          <h3>{name}</h3>
          <div className='card-tipo'>
            <p>Tipo</p>
            {types?.map((el) => (
              <span key={el.type.name} className={el.type.name}>
                {el.type.name}
              </span>
            ))}
          </div>
          <div className='card-categoria'>
            <p>Habilidades</p>
            {abilities?.map((el) => (
              <span key={el.ability.name}>{el.ability.name}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="cardOptions" >
        <div><img src="./img/corazon-lleno.png" alt="" /></div>
      </div>
    </>
  );
};

export default PreferCard;

