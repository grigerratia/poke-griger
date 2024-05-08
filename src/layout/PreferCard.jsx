import React, { useEffect, useState } from "react";
import '../styles/PreferCard.css'

const PreferCard = ({ pokemon }) => {

  const [image, setImage] = useState("");
  const { name, height } = pokemon;

  const getSize = () => {
    if (height < 5) return "baby"
    if (height > 5 && height < 10) return "small"
    if (height > 10 && height < 60) return "big"
    if (height > 60 && height < 100) return "monster"
    if (height > 100 && height < 200) return "monument"
  }

  useEffect(() => {
    pokemon.sprites.other["showdown"].front_default
      ? setImage(pokemon.sprites.other["showdown"].front_default)
      : setImage(pokemon.sprites.other["official-artwork"].front_default)
  }, [image])

  return (
    <>
      <div
        key={name}
        className={"content-preferCard"}
      >
        <picture className={() => getSize}>
          <img src={image} alt={name} />
        </picture>
        <div className='preferCard-details'>
          <h5>{name}</h5>
          <div className="preferCardOptions" >
            <div><img src="./img/corazon-lleno.png" alt="" /></div>
            <div><img src="#" alt="" />°°°</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferCard;

