import React, { useState, useEffect, useContext } from "react";
import { getPokemon } from "../utils/getPokemon";
import { MiContexto } from "../context/context";
import "../styles/Buscador.css";

const Buscador = () => {
	const context = useContext(MiContexto);

	const [pokemonSelec, setPokemonSelec] = useState("");
	const [peticionRealizada, setPeticionRealizada] = useState(false);
	const [pokemonList, setPokemonList] = useState(false);
	const { filteredList, setFilteredList } = context


	fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
		.then((res) => res.json())
		.then((data) => {
			// setPokemonList([...data.results].map((el) => el.name))
			setPokemonList(data.results)
		});

	const buscarPokemon = () => {
		const buscador = document.querySelector("#inputBuscar");
		setPokemonSelec(buscador.value);
		if (buscador.value === "") context.setVerPokeList(true);
		setPeticionRealizada(true);
		context.setVerPokeList(true)
		setFilteredList([...pokemonList].filter(dato => dato.name.toLowerCase().includes(buscador.value.toLowerCase())))
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
