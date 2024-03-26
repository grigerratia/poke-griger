import React, { useContext, useEffect, useState } from "react"
import { MiContexto } from "../context/context"
import { getIdOfUrl } from "../utils/getIdOfUrl"
import "../styles/PokeDetails.css"
import Evolucion from "../Components/Evolucion"
import PokemonFigth from "../Components/PokemonFigth"
import PokeDetailsCard from "./PokeDetailsCard"

const PokeDetails = () => {
	const imgURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

	const pokeDet = useContext(MiContexto)
	const { dataCard } = pokeDet
	const { species, id } = dataCard
	const strId = String(id)
	let actualUrl
	let beforeUrl
	let afterUrl

	const [evolChain, setEvolChain] = useState([])
	const [b, setB] = useState("")
	const [a, setA] = useState("")

	//CIERRA LA VISTA DE DETALLES DEL POKEMON
	const togglePoDe = () => {
		pokeDet.verPokeDe
			? pokeDet.setVerPokeDe(false)
			: pokeDet.setVerPokeDe(true)
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
					let actualIdUrl
					let urlId

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

					const getEvols = () => {
						const ac = evolChain.indexOf(actualUrl)
						beforeUrl = evolChain[ac - 1]
						afterUrl = evolChain[ac + 1]

						setB(beforeUrl)
						setA(afterUrl)
					}
					getEvols()
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
									{b && <Evolucion urlEvol={b} />}
								</div>
								<div className='imageP'>
									<img src={imgURL + dataCard.id + ".png"} alt='' />
								</div>
								<div className='evNext'>
									{a && <Evolucion urlEvol={a} />}
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