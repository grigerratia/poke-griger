import React, { useContext, useEffect } from "react";
import "../styles/BotonSorpresa.css";
import { getPokemon } from '../utils/getPokemon'
import { MiContexto } from '../context/context'

const BotonSorpresa = () => {

	const context = useContext(MiContexto)
	const { setDataCard, setVerPokeDe } = context

	let random = (n) => Math.floor(Math.random() * n)
	const END_POINT = `${random(100000)}`

	const mostrarSorpresa = () => {
		getPokemon(END_POINT)
			.then(res => {
				if (res.status === 404) return getPokemon(`${random(500)}`).then(resp => resp.json())
				return res.json()
			})
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
