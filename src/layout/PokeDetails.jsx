import React, { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"
import { getIdOfUrl } from "../utils/getIdOfUrl"
import { getPokemon } from "../utils/getPokemon";
import axios from "axios";
import Evolutions from "../Components/Evolutions";

import "../styles/PokeDetails.css"
import PokeDetailsCard from "./PokeDetailsCard"

const PokeDetails = () => {
	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

	const context = useContext(MiContexto)
	const { dataCard, setDataCard, setEvolChainGot } = context

	const [evolChain, setEvolChain] = useState([])
	const [render, setRender] = useState(false)
	const { id, species } = dataCard
	const [idI, setidI] = useState(id)
	const strId = String(id)

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
		axios.get(species.url) //Trae los datos de la especie
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
				setidI(id)
			})
	}

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
						setEvolChain(evolChain.push(chain))
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

					//TRAE LOS DATOS DE TODA LA CADENA DE EVOLUCIÓN
					evolChain.map((el, i) => {
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
	}, [render, idI])

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

							<Evolutions id={id} />
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