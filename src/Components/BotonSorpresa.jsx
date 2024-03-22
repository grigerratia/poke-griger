import React, { useContext } from "react";
import "../styles/BotonSorpresa.css";
import { MiContexto } from '../context/context'

const BotonSorpresa = () => {

	const allPokemonsURL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

	const context = useContext(MiContexto)
	const { setDataCard, setVerPokeDe } = context

	let random = (n) => Math.floor(Math.random() * n)

	const mostrarSorpresa = () => {
		fetch(allPokemonsURL)
			.then(res => res.json())
			.then(data => {
				const index = `${random(data.count)}`
				return fetch(data.results[index].url)
			})
			.then(res => res.json())
			.then(data => {
				setDataCard(data)
				setVerPokeDe(true)
			})
	}

	return (
		<div className='botonSorpresa'>
			<div className="boton" onClick={mostrarSorpresa}>Sorpréndeme</div>
		</div>
	);
};

export default BotonSorpresa;
