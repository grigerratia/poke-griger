import React from "react";
import "../styles/PokeCard.css";

const PreferCard = (pokemon) => {

  const { name, types, abilities } = pokemon;

  let image =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
    id +
    ".gif";

  const togglePoDe = () => {
    context.verPokeDe
      ? context.setVerPokeDe(false)
      : context.setVerPokeDe(true)
  };

  const close = () => {
    context.setVerPokeList(true)
  }

  return (
    <>
      <div
        key={types[0].type.name}
        className={"content-card" + " " + types[0]?.type.name}
        onClick={togglePoDe}>
        <picture>
          <img src={img} alt={name} />
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
        <div onClick={close}>❌</div>
      </div>
    </>
  );
};

export default PreferCard;

