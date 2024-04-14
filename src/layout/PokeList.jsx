import { useContext, useEffect, useState } from "react";
import PokeItem from "../Components/PokeItem";
import { MiContexto } from "../context/context";
import { getPokemon } from "../utils/getPokemon";


import "../styles/PokeList.css";

const PokeList = () => {
	const context = useContext(MiContexto);
	const { filteredList, listPokemons, setListPokemons } = context;

	const [pokemonsInit, setPokemonsInit] = useState(1)
	const [pokemonsEnd, setPokemonsEnd] = useState(12)


	//siguiente lote de la lista de pokemons
	const nextBatch = () => {
		setPokemonsInit(pokemonsInit + 12) //13
		setPokemonsEnd(pokemonsEnd + 12) //24
	}

	useEffect(() => {
		filteredList === false
			? getPokemon("")
				.then((res) => res.json())
				.then((data) => {
					setListPokemons(data.results);
				})
			: setListPokemons(filteredList);
	}, [filteredList]);

	return (
		<div className='pokelistContainer'>
			<div className='pokeList'>
				{listPokemons &&
					listPokemons.map((el, i) => {
						if (i + 1 >= pokemonsInit && i < pokemonsEnd) return <PokeItem key={el.name} data={el} />;
					})
				}
				{!listPokemons && <div>Pokemon no encontrado</div>}
			</div>

			<div className='listIndex'>
				<div>{"<<"}</div>
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div onClick={nextBatch}>{">>"}</div>
			</div>
		</div>
	);
};

export default PokeList;
