import React, { useEffect, useState } from "react";
import "../styles/RenderHabilidades.css";

const RenderHabilidades = () => {
	const [isHabilidades, setIsHabilidades] = useState(null);

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/ability?offset=0&limit=367")
			.then((res) => res.json())
			.then((data) => setIsHabilidades(data.results));
	}, []);
	return (
		<div className='renderH'>
			<div className='titleH'>
				<h4>Habilidades</h4>
				<span>
					<img src='../../public/img/arrowDown.png' alt='' />
				</span>
			</div>
			<ul>
				<li>
					<input type='text' />
				</li>
				{isHabilidades?.map((el) => (
					<li key={el.name}>{el.name}</li>
				))}
			</ul>
		</div>
	);
};

export default RenderHabilidades;
