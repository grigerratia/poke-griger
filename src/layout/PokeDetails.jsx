import React, { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"
import { getIdOfUrl } from "../utils/getIdOfUrl"
import { getPokemon } from "../utils/getPokemon";

import "../styles/PokeDetails.css"
import Evolucion from "../Components/Evolucion"
import PokemonFigth from "../Components/PokemonFigth"
import PokeDetailsCard from "./PokeDetailsCard"

const PokeDetails = () => {
	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

	const context = useContext(MiContexto)

	const [evolChain, setEvolChain] = useState([])
	const [pokemon, setPokemon] = useState()
	const { dataCard, setDataCard, beforeEvolution, setBeforeEvolution, nextEvolution, setNextEvolution } = context
	const { id } = dataCard
	const strId = String(id)
	let actualUrl
	let actualIdUrl
	let urlId

	const [b, setB] = useState("")
	const [a, setA] = useState("")

	//CIERRA LA VISTA DE DETALLES DEL POKEMON
	const togglePoDe = () => {
		context.verPokeDe
			? context.setVerPokeDe(false)
			: context.setVerPokeDe(true)
	};

	// const cambiarPokemon = () => {
	// 	setDataCard(pokemon)
	// }

	//LLAMA LA ESPECIE DEL POKEMON PARA VER LOS DATOS DE SU CADENA DE EVOLUCIÓN
	useEffect(() => {
		fetch(dataCard.species.url)
			.then(res => res.json())
			.then(data => data)
			.then(data => fetch(data.evolution_chain.url))
			.then(res => res.json())
			.then(data => {

				const getEvolves = (chain) => {
					if (!chain) return

					//AGREGA AL ARRAY EL PRIMER POKEMON DE LA CADENA
					const makeEvolChain = (chain) => {
						setEvolChain(evolChain?.push(chain))
						urlId = getIdOfUrl(chain).toString()
						if (urlId === strId) {
							actualUrl = chain
							actualIdUrl = urlId
						}
					}
					makeEvolChain(chain.species.url)

					//AGREGA AL ARRAY LAS EVOLUCIONES CUANDO SON MÁS DE 2
					if (chain.evolves_to.length > 1) {
						const loop = (chain) => {
							chain.forEach(evol => makeEvolChain(evol.species.url));
							return
						}
						loop(chain.evolves_to)
					}

					//AGREGA AL ARRAY LAS EVOLUCIONES CUANDO SON SOLO 2 O UNA
					if (chain.evolves_to.length === 1) {
						const loop = (chain) => {
							if (!chain) return
							makeEvolChain(chain.species.url)
							loop(chain.evolves_to[0])
						}
						loop(chain.evolves_to[0])
					}

					const getEvols = () => {
						const ac = evolChain.indexOf(actualUrl)
						setB(evolChain[ac - 1])
						setA(evolChain[ac + 1])


					}
					getEvols()


				}
				getEvolves(data.chain)

			})

		getPokemon(getIdOfUrl(b).toString())
			.then(res => res.json())
			.then(data => {
				setBeforeEvolution(data)
			})

		getPokemon(getIdOfUrl(a).toString())
			.then(res => res.json())
			.then(data => {
				setNextEvolution(data)
			})

	}, [dataCard])

	return (
		<div className="contentPokeDetails">
			<div className='pokeDetails'>
				<div className='pokeDetailContainer'>
					<div className='pokeDetailMain'>
						<div className='pokemon'>
							<div className='pokemonImage'>
								<div className='evBefore'>
									{beforeEvolution && <Evolucion urlEvol={beforeEvolution} />}

								</div>
								<div className='imageP'>
									<img src={imgURL + dataCard.id + ".png"} alt='' />
								</div>
								<div className='evNext'>
									{nextEvolution && <Evolucion urlEvol={nextEvolution} />}
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
		</div >
	);
};

export default PokeDetails;