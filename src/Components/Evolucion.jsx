import React, { useEffect, useState } from "react";
import "../styles/Evolucion.css";

const Evolucion = ({ urlEvol }) => {

	const [pokemon, setPokemon] = useState()

	useEffect(() => {
		fetch(urlEvol)
			.then(res => res.json())
			.then(data => {
				setPokemon(data)
			})
	}, [])

	return (
		<div className='evolucion'>
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
