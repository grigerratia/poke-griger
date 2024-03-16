import React, {useContext} from "react";
import "../styles/BotonSorpresa.css";
import {getPokemon} from '../utils/getPokemon'
import {MiContexto} from '../context/context'

const BotonSorpresa = () => {

	const context = useContext(MiContexto)
	const { setDataCard, setVerPokeList } = context

	let random = () => Math.floor(Math.random() * 1303)

	const END_POINT = `${random()}`
	const mostrarSorpresa = async () => {
		const res = await getPokemon(END_POINT)
		const data = await res.json()

	

		setDataCard(data)
		setVerPokeList(false)
	}

	return (
		<div className='botonSorpresa'>
			<button onClick={mostrarSorpresa}>Sorpréndeme</button>
		</div>
	);
};

export default BotonSorpresa;
