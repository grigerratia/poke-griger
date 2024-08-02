import React, { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokeCard.css";

const PokeCard = () => {
	const context = useContext(MiContexto);
	const { dataCard, favorite, setFavorite, isFavoriteCNTX, setIsFavoriteCNTX } = context;

	const { name, types, abilities, id } = dataCard;

	const [favorito, setFavorito] = useState([])

	const [ isFavorite, setIsFavorite] = useState("./img/corazon-lleno.png")

	const img =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
		id +
		".png";

	const togglePoDe = () => {
		context.verPokeDe
			? context.setVerPokeDe(false)
			: context.setVerPokeDe(true)
	};

	const close = () => {
		context.setVerPokeList(true)
		setIsFavorite("./img/corazon-lleno.png")
	}

	const addToFavorites = (namePokemon) => {
		if (localStorage.getItem("Favorites")) {
			const thisFavorite = JSON.parse(localStorage.getItem("Favorites"))
			if (thisFavorite.includes(namePokemon)) {
				const actualFavorites = JSON.parse(localStorage.getItem("Favorites"))
				const newFavorites = actualFavorites.filter((el) => el != namePokemon)
				localStorage.setItem("Favorites", JSON.stringify(newFavorites))
				//setHartIcon()
				return
			}
			setFavorite(JSON.parse(localStorage.getItem("Favorites")))
			setFavorite(favorite?.push(namePokemon))
			setFavorito(JSON.parse(localStorage.getItem("Favorites")))
			setFavorito(favorito.push(namePokemon))
			localStorage.setItem("Favorites", JSON.stringify(favorite))
			//setHartIcon()
			return
		}
		setFavorito(favorito.push(namePokemon))
		setFavorite(favorite?.push(namePokemon))
		localStorage.setItem("Favorites", JSON.stringify(favorito))
		//setHartIcon()
	}

	useEffect(()=> {
		const setHartIcon = () => {
			const thisFavorite = JSON.parse(localStorage.getItem("Favorites"))
			thisFavorite.find(el => el === name)
				? setIsFavorite("./img/corazon.png")
				: null
		}
		setHartIcon()
	}, [isFavorite])

	


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
				<div 
					onClick={(event) => {
						event.stopPropagation();
						addToFavorites(name);
					}}>
					<img src={isFavorite} alt="" />
				</div>

				<img onClick={close} src='./img/equis.png' alt='salir del modal' />
			</div>
		</>
	);
};

export default PokeCard;
