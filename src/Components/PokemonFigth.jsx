import React, { useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokemonFigth.css";

const PokemonFigth = () => {
	const context = useContext(MiContexto);
	const { dataCard } = context;
	const { stats } = dataCard;


	return (
		<div className='pokemonFigth'>
			{stats.map((el) => {
				return (
					<div className='inf' key={el.stat.name}>
						<h4 className='infItem'>{el.stat.name}</h4>
						<span className='indDetails'>{el.base_stat}</span>
					</div>
				);
			})}
		</div>
	);
};

export default PokemonFigth;
