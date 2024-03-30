import React, { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";

const PokeDetailsCard = () => {
	const context = useContext(MiContexto);
	const { dataCard } = context;
	const { types } = dataCard;
	const [description, setDescription] = useState("");


	useEffect(() => {
		fetch(dataCard.species?.url).then((res) => {
			if (res.status !== 404) {
				res.json().then((data) => {

					setDescription(() =>
						[...data.flavor_text_entries].find(
							(el) => el.language.name === "es"
						)?.flavor_text
					)

				});
			}
		});
	}, [dataCard])


	// const description = data?.map((el) => el.flavor_text_entries);
	// console.log(description);
	return (
		<div className='pokemonDetailsCard'>
			<div className='nameNum'>
				<h3>{dataCard.name}</h3>
				<div>{dataCard.id}</div>
			</div>
			<div className='pokDetTipos'>
				<h4>Tipo</h4>
				{types?.map((el) => (
					<span key={el.type.name} className="spanTypeName">{el.type.name.toUpperCase()}</span>
				))}
			</div>
			<div className='pokeDescription'>
				<h4>Descripción:</h4>
				<p>{description ? description : "Sin información de esta especie."}</p>
			</div>
			<div className='pokemonCarateristicas'>
				<div className='dtPk'>
					<div className='infItem'>Altura:</div>
					<div className='indDetails'>250</div>
				</div>
				<div className='dtPk'>
					<div className='infItem'>Categoría:</div>
					<div className='indDetails'>250</div>
				</div>
				<div className='dtPk'>
					<div className='infItem'>Peso:</div>
					<div className='indDetails'>250</div>
				</div>
				<div className='dtPk'>
					<div className='infItem'>Habilidad:</div>
					<div className='indDetails'>250</div>
				</div>
				<div className='dtPk'>
					<div className='infItem'>Sexo:</div>
					<div className='indDetails'>250</div>
				</div>
			</div>
			<div className='pokeDebilidad'>
				<h4>Debilidad</h4>
				<span>Fuego</span>
			</div>
		</div>
	);
};

export default PokeDetailsCard;
