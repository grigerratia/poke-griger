import React, { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";

import "../styles/PokeDetails.css";
import Evolucion from "../Components/Evolucion";
import PokemonFigth from "../Components/PokemonFigth";
import PokeDetailsCard from "./PokeDetailsCard";

const PokeDetails = () => {
	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

	const pokeDet = useContext(MiContexto);
	const { dataCard } = pokeDet;
	const { species } = dataCard

	const [nameEvBefore, setNameEvBefore] = useState("")
	const [idEvBefore, setIdEvBefore] = useState("")
	const [urlBefore, setUrlBefore] = useState("")

	const [nameEvNext, setNameEvNext] = useState("")
	const [idEvNext, setEvNext] = useState("")
	const [urlNext, setUrlNext] = useState("")



	//CIERRA LA VISTA DE DETALLES DEL POKEMON
	const togglePoDe = () => {
		pokeDet.verPokeDe
			? pokeDet.setVerPokeDe(false)
			: pokeDet.setVerPokeDe(true);
	};

	//LLAMA LA ESPECIE DEL POKEMON PARA VER LOS DATOS DE SUS EVOLUCIONES
	useEffect(() => {
		fetch(species.url)
			.then(res => res.json())
			.then(data => {
				return data
			})
			.then(data => fetch(data.evolves_from_species.url))
			.then(res => res.json())
			.then(data => {
				setNameEvBefore(data.name)
				setIdEvBefore(data.id)
				console.log(data);
				return data
			})
	}, [])

	return (
		<div className="contentPokeDetails">
			<div className='pokeDetails'>
				<div className='pokeDetailContainer'>
					<div className='pokeDetailMain'>
						<div className='pokemon'>
							<div className='pokemonImage'>
								<div className='evBefore'>
									<Evolucion nameEv={nameEvBefore} idEv={idEvBefore} />
								</div>
								<div className='imageP'>
									<img src={imgURL + dataCard.id + ".png"} alt='' />
								</div>
								<div className='evNext'>
									<Evolucion nameEv={nameEvBefore} idEv={idEvBefore} />
								</div>
							</div>
							<PokemonFigth />
						</div>
						<PokeDetailsCard />
					</div>
					<div className='beforeNextPokemon'>
						<div className='beNePo beforeP'>Before</div>
						<div className='beNePo nextP'>Next</div>
					</div>
				</div>
				<div className='salirPokeDetails' onClick={togglePoDe}>
					X
				</div>
			</div>
		</div>
	);
};

export default PokeDetails;
