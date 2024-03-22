import React, { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { getIdOfUrl } from "../utils/getIdOfUrl"
import "../styles/PokeDetails.css";
import Evolucion from "../Components/Evolucion";
import PokemonFigth from "../Components/PokemonFigth";
import PokeDetailsCard from "./PokeDetailsCard";

const PokeDetails = () => {
	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

	const pokeDet = useContext(MiContexto);
	const { dataCard } = pokeDet;
	const { species } = dataCard

	const [evolChain, setEvolChain] = useState([])
	const [actualEvol, setActualEvol] = useState("")
	const [beforeEvol, setBeforeEvol] = useState([])

	//CIERRA LA VISTA DE DETALLES DEL POKEMON
	const togglePoDe = () => {
		pokeDet.verPokeDe
			? pokeDet.setVerPokeDe(false)
			: pokeDet.setVerPokeDe(true);
	};

	//LLAMA LA ESPECIE DEL POKEMON PARA VER LOS DATOS DE SU CADENA DE EVOLUCIÓN
	useEffect(() => {
		fetch(species.url)
			.then(res => res.json())
			.then(data => data)
			.then(data => fetch(data.evolution_chain.url))
			.then(res => res.json())
			.then(data => {
				const getEvolves = (chain) => {
					if (!chain) return

					//AGREGA AL ARRAY EL PRIMER POKEMON DE LA CADENA
					setEvolChain(evolChain.push(chain.species.url))


					//AGREGA AL ARRAY LAS EVOLUCIONES CUANDO SON MÁS DE 2
					if (chain.evolves_to.length > 1) {
						const loop = (chain) => {
							chain.forEach(evol => {
								setEvolChain(evolChain.push(evol.species.url))
							});
							return
						}
						loop(chain.evolves_to)
					}

					//AGREGA AL ARRAY LAS EVOLUCIONES CUANDO SON SOLO 2 O UNA
					if (chain.evolves_to.length === 1) {
						const loop = (chain) => {
							if (!chain) return
							setEvolChain(evolChain.push(chain.species.url))
							loop(chain.evolves_to[0])
						}
						loop(chain.evolves_to[0])
					}
				}
				getEvolves(data.chain)
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
									<Evolucion nameEv={'nombre'} idEv={1} />
								</div>
								<div className='imageP'>
									<img src={imgURL + dataCard.id + ".png"} alt='' />
								</div>
								<div className='evNext'>
									<Evolucion nameEv={'otroN'} idEv={78} />
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
