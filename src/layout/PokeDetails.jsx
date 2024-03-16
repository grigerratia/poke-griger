import React, { useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokeDetails.css";
import Evolucion from "../Components/Evolucion";
import PokemonFigth from "../Components/PokemonFigth";
import PokeDetailsCard from "./PokeDetailsCard";

const PokeDetails = () => {
	const imgURL =
		"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

	const pokeDet = useContext(MiContexto);
	const { dataCard, pokeList } = pokeDet;

	const togglePoDe = () => {
		pokeDet.verPokeDe
			? pokeDet.setVerPokeDe(false)
			: pokeDet.setVerPokeDe(true);
		console.log();
	};
	return (
		<div className='pokeDetails'>
			<div className='pokeDetailContainer'>
				<div className='pokeDetailMain'>
					<div className='pokemon'>
						<div className='pokemonImage'>
							<div className='evBefore'>
								<Evolucion />
							</div>
							<div className='imageP'>
								<img src={imgURL + dataCard.id + ".png"} alt='' />
							</div>
							<div className='evNext'>
								<Evolucion />
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
	);
};

export default PokeDetails;
