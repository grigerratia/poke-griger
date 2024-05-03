import React, { useContext } from "react";
import "../styles/Ordenador.css";
import { MiContexto } from "../context/context";


const Ordenador = () => {
	const context = useContext(MiContexto);
	const { setFilteredList, filteredList, allPokemons } = context


	const orderSup = () => {
	}
	const orderInf = () => {

	}
	const orderAZ = () => {
		if (filteredList === false) {
			setFilteredList([...allPokemons].sort((a, b) => a.name.localeCompare(b.name)))
			return
		}
		setFilteredList(filteredList.sort((a, b) => a.name.localeCompare(b.name)))
	}
	const orderZA = () => {

	}

	return (
		<div className='ordenador'>
			<div className='ordenar'>Ordenar</div>
			<ul>
				<li value='numero-superior'>Número superior</li>
				<li value='numero-inferior'>Número inferior</li>
				<li value='a-z' onClick={orderAZ}>A - Z</li>
				<li value='z-a'>Z - A</li>
			</ul>
		</div>
	);
};

export default Ordenador;
