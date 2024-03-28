import React, { useEffect, useState, useContext } from "react";
import "../styles/Evolucion.css";
import { MiContexto } from "../context/context";
import { getIdOfUrl } from "../utils/getIdOfUrl";
import { getPokemon } from "../utils/getPokemon";


const Evolucion = ({ urlEvol }) => {

	const context = useContext(MiContexto)
	const { dataCard, setDataCard } = context
	const [pokemon, setPokemon] = useState()
	const [evol, setEvol] = useState(urlEvol)

	const cambiarPokemon = () => {
		console.log({ Evolucion: pokemon });
		setDataCard(pokemon)
	}

	useEffect(() => {
		getPokemon(getIdOfUrl(urlEvol).toString())
			.then(res => res.json())
			.then(data => {
				setPokemon(data)
			})
	}, [evol])

	return (
		<div className='evolucion' onClick={cambiarPokemon}>
			<div className='evolucion-circulo'>
				<figure>
					<img
						src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" + pokemon?.id + ".gif"}
						alt=''
					/>
				</figure>
			</div>
			<div className='evolucion-datos'>
				<div className='evolucion-datos--nombre'>{pokemon?.name}</div>
			</div>
		</div>
	);
};

export default Evolucion;
