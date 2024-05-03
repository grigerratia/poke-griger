import React, { useState, useEffect, useContext } from "react";
import { getPokemon } from "../utils/getPokemon";
import { MiContexto } from "../context/context";
import "../styles/Buscador.css";

const Buscador = () => {
	const context = useContext(MiContexto);

	const [pokemonSelec, setPokemonSelec] = useState("");
	const [peticionRealizada, setPeticionRealizada] = useState(false);
	const { setFilteredList, setCount, setFirstNum, allPokemons } = context


	const clearSearched = () => {
		const buscador = document.querySelector("#inputBuscar");
		if (buscador.value === "") return
		buscador.value = ""
		setPokemonSelec("")
		setFilteredList([...allPokemons].filter(dato => dato.name.toLowerCase().includes(buscador.value.toLowerCase())))
		setPeticionRealizada(true)
		context.setVerPokeList(true)
	}

	const buscarPokemon = () => {
		setCount(0)
		setFirstNum([1, 2, 3, 4, 5, 6])
		const buscador = document.querySelector("#inputBuscar");
		setPokemonSelec(buscador.value);
		if (buscador.value === "") context.setVerPokeList(true);
		setPeticionRealizada(true);
		context.setVerPokeList(true)
		setFilteredList([...allPokemons].filter(dato => dato.name.toLowerCase().includes(buscador.value.toLowerCase())))
	};

	useEffect(() => {
		if (peticionRealizada) {
			getPokemon(pokemonSelec).then((res) => {
				if (res.status !== 404) {
					res.json().then((data) => {
						context.setDataCard(data);
						const buscador = document.querySelector("#inputBuscar");
						context.setVerPokeList(false);
						if (buscador.value === "") context.setVerPokeList(true)
					});
				}
			});
		}
	}, [pokemonSelec, peticionRealizada]);

	return (
		<div className='buscador'>
			<div className="xBuscador" onClick={clearSearched}></div>
			<input
				type='text'
				placeholder='Buscar pokemon'
				id='inputBuscar'
				onChange={buscarPokemon}
			/>
			<span>
				<img src='./img/lupa.png' alt='' />
			</span>
		</div>
	);
};

export default Buscador;
