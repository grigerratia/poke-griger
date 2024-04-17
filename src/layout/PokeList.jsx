import { useContext, useEffect, useState } from "react";
import PokeItem from "../Components/PokeItem";
import { MiContexto } from "../context/context";
import { getPokemon } from "../utils/getPokemon";


import "../styles/PokeList.css";

const PokeList = () => {
	const context = useContext(MiContexto);
	const { filteredList, listPokemons, setListPokemons, lengthBatch, setLengthBatch } = context;
	const [firstNum, setFirstNum] = useState([1, 2, 3, 4, 5, 6])
	const [count, setCount] = useState(1)




	//siguiente y anterior lote de la lista de pokemons por flechas
	const navBatch = (op) => {
		if (op === "next") {
			setLengthBatch({
				initBatch: lengthBatch.initBatch + 12,
				endBatch: lengthBatch.endBatch + 12
			})
			setCount(count + 1)
		} else {
			if (lengthBatch.initBatch === 1) return
			setLengthBatch({
				initBatch: lengthBatch.initBatch - 12,
				endBatch: lengthBatch.endBatch - 12
			})
			setCount(count - 1)
		}
	}

	//siguiente y anterior lote de la lista de pokemons por números
	const navNum = (num) => {
		if (num === count) return
		setCount(num)
		console.log(num);
		setLengthBatch({
			initBatch: (12 * num),
			endBatch: (12 * num) + 11
		})

		if (num === firstNum.at(-1)) {
			setFirstNum(firstNum.map(num => num++))
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
				{
					firstNum.map(el => (
						<div key={el} onClick={() => navNum(el)}>{el}</div>
					))
				}
				<div onClick={() => navBatch("next")}>{">>"}</div>
			</div>
		</div>
	);
};

export default PokeList;
