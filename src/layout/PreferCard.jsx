import React, { useEffect, useState } from "react";
import '../styles/PreferCard.css'

const PreferCard = ({ pokemon }) => {

  const [image, setImage] = useState("");
  const [imgSize, setImgSize] = useState("baby");
  const { name, height } = pokemon;


  useEffect(() => {
    pokemon.sprites.other["showdown"].front_default
      ? setImage(pokemon.sprites.other["showdown"].front_default)
      : setImage(pokemon.sprites.other["official-artwork"].front_default)

    const getSize = () => {
      if (height < 4) setImgSize("baby")
      if (height > 4 && height < 10) setImgSize("small")
      if (height > 10 && height < 60) setImgSize("big")
      if (height > 60 && height < 100) setImgSize("monster")
      if (height > 100 && height < 201) setImgSize("monument")
    }
    getSize()
  }, [image])

  return (
    <>
      <div
        key={name}
        className={"content-preferCard"}
      >
        <picture >
          <img src={image} alt={name} className={imgSize} />
        </picture>
        <div className='preferCard-details'>
          <h5>{name}</h5>
          <div className="preferCardOptions" >
            <div><img src="./img/corazon-lleno.png" alt="" /></div>
            <div className="optionsFavorite"><img src="#" alt="" />
              <p>°°°</p>
              <ul>
                <li>Detalles</li>
                <li>Quitar de favoritos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreferCard;

