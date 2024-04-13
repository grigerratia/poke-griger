import React, { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"
import { getIdOfUrl } from "../utils/getIdOfUrl"
import { getPokemon } from "../utils/getPokemon";
import axios from "axios";
import Evolutions from "../Components/Evolutions";

import "../styles/PokeDetails.css"
import PokeDetailsCard from "./PokeDetailsCard"

const PokeDetails = () => {

	// EVOLUTIONS::::::::::::::::::::::::::::::

	const evolStyles = { border: "solid 1px #484747", borderRadius: "8px" }
	const evolImgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/"


	// useEffect(() => {
	// 	setEvolutions(evolChainGot)
	// }, [evolutions, evolChainGot])

	//CAMBIA EL POKEMON DE LA CADENA DE EVOLUCIÓN DQUE SE SELECCIONA
	const cambiarEvol = (p) => {
		setDataCard(p)
	}

	// EVOLUTIONS::::::::::::::::::::::::::::::


	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

	const context = useContext(MiContexto)
	const { dataCard, setDataCard, evolChainGot, setEvolChainGot, setIdDataCard } = context
	const [evolutions, setEvolutions] = useState(evolChainGot)

	const [evolChain, setEvolChain] = useState([])
	const [render, setRender] = useState(false)
	let { id } = dataCard

	let urlId
	let actualUrl
	let actualIdUrl
	let varEvolChain = []


	//CIERRA LA VISTA DE DETALLES DEL POKEMON
	const togglePoDe = () => {
		context.verPokeDe
			? (context.setVerPokeDe(false), setEvolChainGot([]))
			: context.setVerPokeDe(true)
	};

	//NAVEGAR HACIA LA ANTERIOR O SIGUIENTE CADENA DE EVOLUCINES
	const navegarEnCadenas = (op) => {
		(context.setVerPokeDe(false))

		const dataPokemon = dataCard
		axios.get(dataPokemon.species.url) //Trae los datos de la especie
			.then(response => {
				const urlEvCh = "https://pokeapi.co/api/v2/evolution-chain/"
				if (op === "-") {
					const idChain = String(getIdOfUrl(response.data.evolution_chain.url) - 1)
					return axios.get(urlEvCh + idChain)
				}
				const idChain = String(getIdOfUrl(response.data.evolution_chain.url) + 1)
				return axios.get(urlEvCh + idChain)
			})
			.then(response => getPokemon(String(getIdOfUrl(response.data.chain.species.url))))
			.then(res => res.json())
			.then(data => {
				setDataCard(data)
				setIdDataCard(dataCard.id)
				setRender(render ? true : false)
				context.setVerPokeDe(true)
			})
	}

	//LLAMA LA ESPECIE DEL POKEMON PARA VER LOS DATOS DE SU CADENA DE EVOLUCIÓN
	useEffect(() => {
		const dataPokemon = dataCard
		fetch(dataPokemon.species.url)
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
						if (urlId === id) {
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

					//TRAE LOS DATOS DE TODA LA CADENA DE EVOLUCIÓN
					evolChain.map((el, i) => {
						setIdDataCard(dataCard.id)
						getPokemon(getIdOfUrl(el).toString())
							.then(res => res.json())
							.then(data => {
								varEvolChain.push(data)
								if (i === evolChain.length - 1) {
									setEvolChainGot(varEvolChain)
									setRender(render ? true : false)
								}
							})
					})
				}
				getEvolves(data.chain)

			})
	}, [render, evolutions, evolChainGot])

	return (
		<div className="contentPokeDetails">
			<div className='pokeDetails'>
				<div className='pokeDetailContainer'>
					<div className='pokeDetailMain'>
						<div className='pokemon'>
							<div className='pokemonImage'>
								<div className='imageP'>
									<img src={imgURL + dataCard?.id + ".png"} alt='' />
								</div>
							</div>


							{/* EVOLUTIONS::::::::::::::::::::::: */}

							<div className="evolucionContainer">
								{
									evolChainGot.sort((a, b) => a.id - b.id)?.map((pokemon) =>
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


							{/* EVOLUTIONS::::::::::::::::::::::: */}

						</div>


						<PokeDetailsCard />
					</div>





					<div className='beforeNextPokemon'>
						<div className='beNePo beforeP' onClick={() => navegarEnCadenas("-")}>Before</div>
						<div className='beNePo nextP' onClick={() => navegarEnCadenas("+")}>Next</div>
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