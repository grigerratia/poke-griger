import { useContext, useEffect, useState } from "react";
import PokeItem from "../Components/PokeItem";
import { MiContexto } from "../context/context";
import { getPokemon } from "../utils/getPokemon";


import "../styles/PokeList.css";

const PokeList = () => {
	const context = useContext(MiContexto);
	const numStyles = { border: "solid 1px #484747", borderRadius: "8px" }
	const { filteredList, listPokemons, setListPokemons, lengthBatch, setLengthBatch, count, setCount, firstNum, setFirstNum } = context;

	//siguiente y anterior lote de la lista de pokemons por números
	const navNum = (num) => {
		if (num === count) return

		setLengthBatch({
			initBatch: (12 * num) - 11,
			endBatch: (12 * num)
		})
		setCount(num)
	}

	//siguiente y anterior lote de la lista de pokemons por flechas
	const navBatch = (op) => {
		if (op === "next") {
			if (firstNum.at(-1) === count) {
				navDoubleBatch("next")
				return
			}
			setCount(count + 1)
			setLengthBatch({
				initBatch: lengthBatch.initBatch + 12,
				endBatch: lengthBatch.endBatch + 12
			})
		} else {
			if (firstNum[0] === count) {
				navDoubleBatch("before")
				return
			}
			if (lengthBatch.initBatch === 1) return
			setLengthBatch({
				initBatch: lengthBatch.initBatch - 12,
				endBatch: lengthBatch.endBatch - 12
			})
			setCount(count - 1)
		}
	}

	//Siguiente lote de números de la lista
	const navDoubleBatch = (op) => {
		if (op === "next") {
			setCount(firstNum[0] + 6)
			setFirstNum(firstNum.map(num => num + 6))
			const newFirstNum = firstNum.map(num => num + 6)
			setLengthBatch({
				initBatch: (12 * newFirstNum[0]) - 11,
				endBatch: (12 * newFirstNum[0])
			})
		} else {
			if (lengthBatch.initBatch === 1) return
			setCount(firstNum[0] - 6)
			setFirstNum(firstNum.map(num => num - 6))
			const newFirstNum = firstNum.map(num => num - 6)
			setLengthBatch({
				initBatch: (12 * newFirstNum[0]) - 11,
				endBatch: (12 * newFirstNum[0])
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
					lengthBatch.initBatch != 1 && <div onClick={() => navDoubleBatch("before")}>{"<<·"}</div>
				}
				{
					lengthBatch.initBatch != 1 && <div onClick={() => navBatch("before")}>{"<·"}</div>
				}
				{
					firstNum.map(el => (
						<div
							key={el}
							style={count === el ? numStyles : null}
							onClick={() => navNum(el)}>{el}</div>
					))
				}
				<div onClick={() => navBatch("next")}>{"·>"}</div>
				<div onClick={() => navDoubleBatch("next")}>{"·>>"}</div>
			</div>
		</div>
	);
};

export default PokeList;
