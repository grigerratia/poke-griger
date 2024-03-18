import React, { useContext, useState } from "react";
import "../styles/BotonSorpresa.css";
import { getPokemon } from '../utils/getPokemon'
import { MiContexto } from '../context/context'

const BotonSorpresa = () => {

	const context = useContext(MiContexto)
	const { setDataCard, setVerPokeList } = context



	let random = () => Math.floor(Math.random() * 1302)

	const END_POINT = `${random()}`
	const mostrarSorpresa = async () => {
		const res = await getPokemon(END_POINT)
		const data = await res?.json()

		const mostrarCard = async () => await data ? setDataCard(data) : mostrarSorpresa()
		mostrarCard()
		setVerPokeList(false)
		return data
	}

	return (
		<div className='botonSorpresa'>
			<div className="boton" onClick={mostrarSorpresa}>Sorpréndeme</div>
		</div>
	);
};

export default BotonSorpresa;
