import { useContext, useEffect, useState } from "react";
import PokeItem from "../Components/PokeItem";
import { MiContexto } from "../context/context";
import { getPokemon } from "../utils/getPokemon";


import "../styles/PokeList.css";

const PokeList = () => {
	const context = useContext(MiContexto);
	const { filteredList, listPokemons, setListPokemons, countNav, setCountNav } = context;


	const [pokemonsInit, setPokemonsInit] = useState((12 * countNav) - 11)
	const [pokemonsEnd, setPokemonsEnd] = useState(12)

	//siguiente y anterior lote de la lista de pokemons
	const nextBatch = (op) => {
		if (op === "next") {
			setCountNav(countNav + 1)
			setPokemonsInit((12 * countNav) - 11) //13
			setPokemonsEnd(pokemonsInit + 12) //24
			console.log({ pokemonsInit: pokemonsInit });
			console.log({ pokemonsEnd: pokemonsEnd });
		} else {
			if (countNav === 1) return
			setPokemonsInit(12 * countNav - 11) //13
			setPokemonsEnd(pokemonsEnd - 12) //24
			setCountNav(countNav - 1)
		}
	}

	useEffect(() => {
		filteredList === false
			? getPokemon("?limit=100000&offset=0")
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
						if (i + 1 >= pokemonsInit && i < pokemonsEnd) return (<PokeItem key={el.name} data={el} />)
					})
				}
				{!listPokemons && <div>Pokemon no encontrado</div>}
			</div>

			<div className='listIndex'>
				{
					countNav != 0 && <div onClick={() => nextBatch("before")}>{"<<"}</div>
				}
				<div>1</div>
				<div>2</div>
				<div>3</div>
				<div onClick={() => nextBatch("next")}>{">>"}</div>
			</div>
		</div>
	);
};

export default PokeList;
