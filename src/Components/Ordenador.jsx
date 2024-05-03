import React, { useContext } from "react";
import { getIdOfUrl } from '../utils/getIdOfUrl'
import "../styles/Ordenador.css";
import { MiContexto } from "../context/context";


const Ordenador = () => {
	const context = useContext(MiContexto);
	const { setFilteredList, filteredList, allPokemons } = context

	//ORDENA DESDE EL NÚMERO MENOR AL MAYOR
	const orderSup = () => {
		if (filteredList === false) {
			setFilteredList([...allPokemons].sort((a, b) => {
				if (getIdOfUrl(a.url) < getIdOfUrl(b.url)) { return -1; }
				if (getIdOfUrl(a.url) > getIdOfUrl(b.url)) { return 1; }
				return 0;
			}))
		}
		setFilteredList([...filteredList].sort((a, b) => {
			if (getIdOfUrl(a.url) < getIdOfUrl(b.url)) { return -1; }
			if (getIdOfUrl(a.url) > getIdOfUrl(b.url)) { return 1; }
			return 0;
		}))
	}

	//ORDENA DESDE EL MAYOR MENOR AL MENOR
	const orderInf = () => {
		if (filteredList === false) {
			setFilteredList([...allPokemons].sort((a, b) => {
				if (getIdOfUrl(a.url) < getIdOfUrl(b.url)) { return 1; }
				if (getIdOfUrl(a.url) > getIdOfUrl(b.url)) { return -1; }
				return 0;
			}))
		}
		setFilteredList([...filteredList].sort((a, b) => {
			if (getIdOfUrl(a.url) < getIdOfUrl(b.url)) { return 1; }
			if (getIdOfUrl(a.url) > getIdOfUrl(b.url)) { return -1; }
			return 0;
		}))
	}

	//ORDENA DESDE ALFABETICAMENTE DESDE LA A HASTA LA Z
	const orderAZ = () => {
		if (filteredList === false) {
			setFilteredList([...allPokemons].sort((a, b) => a.name.localeCompare(b.name)))
			return
		}
		setFilteredList([...filteredList].sort((a, b) => a.name.localeCompare(b.name)))
	}

	//ORDENA DESDE ALFABETICAMENTE DESDE LA Z HASTA LA A
	const orderZA = () => {
		if (filteredList === false) {
			setFilteredList([...allPokemons].sort((a, b) => {
				if (a.name < b.name) { return 1; }
				if (a.name > b.name) { return -1; }
				return 0;
			}))
			return
		}
		setFilteredList([...filteredList].sort((a, b) => {
			if (a.name < b.name) { return 1; }
			if (a.name > b.name) { return -1; }
			return 0;
		}))
	}

	return (
		<div className='ordenador'>
			<div className='ordenar'>Ordenar</div>
			<ul>
				<li onClick={orderSup}>Número superior</li>
				<li onClick={orderInf}>Número inferior</li>
				<li onClick={orderAZ}>A - Z</li>
				<li onClick={orderZA}>Z - A</li>
			</ul>
		</div>
	);
};

export default Ordenador;
