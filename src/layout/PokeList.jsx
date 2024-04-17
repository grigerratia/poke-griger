import { useContext, useEffect, useState } from "react";
import PokeItem from "../Components/PokeItem";
import { MiContexto } from "../context/context";
import { getPokemon } from "../utils/getPokemon";


import "../styles/PokeList.css";

const PokeList = () => {
	const context = useContext(MiContexto);
	const { filteredList, listPokemons, setListPokemons, lengthBatch, setLengthBatch } = context;




	//siguiente y anterior lote de la lista de pokemons
	const navBatch = (op) => {
		if (op === "next") {
			setLengthBatch({
				initBatch: lengthBatch.initBatch + 12,
				endBatch: lengthBatch.endBatch + 12
			})
		} else {
			if (lengthBatch.initBatch === 1) return
			setLengthBatch({
				initBatch: lengthBatch.initBatch - 12,
				endBatch: lengthBatch.endBatch - 12
			})
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
						if (i + 1 >= lengthBatch.initBatch && i < lengthBatch.endBatch) return (<PokeItem key={el.name} data={el} />)
					})
				}
				{!listPokemons && <div>Pokemon no encontrado</div>}
			</div>

			<div className='listIndex'>
				{
					lengthBatch.initBatch != 1 && <div onClick={() => navBatch("before")}>{"<<"}</div>
				}
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div onClick={() => navBatch("next")}>{">>"}</div>
			</div>
		</div>
	);
};

export default PokeList;
