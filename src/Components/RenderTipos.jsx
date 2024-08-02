import React, { useState, useEffect } from "react";
import "../styles/RenderTipos.css";

const RenderTipos = () => {
	let [isTipos, setIsTipos] = useState(null);
	let [estate, setState] = useState(false)
	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/type/")
			.then((res) => res.json())
			.then((data) => {
				setIsTipos(data.results);
			});
	}, []);

	return (
		<div className='renderT'>
			{isTipos?.map((el) => (
				<span key={el.name} className={el.name}>
					{el.name}
				</span>
			))}
		</div>
	);
};

export default RenderTipos;
