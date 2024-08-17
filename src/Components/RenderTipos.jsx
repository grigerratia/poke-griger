import React, { useState, useEffect, useRef } from "react";
import "../styles/RenderTipos.css";

const RenderTipos = () => {

	const typeRef = useRef(null)

	let [isTipos, setIsTipos] = useState(null);
	let [active, setActive] = useState(false)
	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/type/")
			.then((res) => res.json())
			.then((data) => {
				setIsTipos(data.results);
			});
	}, [active]);

	function hacerAlgo(nameOfClass){
		// alert(nameOfClass)

		const thisClass = nameOfClass
		const renderTipos = document.querySelector(thisClass)
		// renderTipos.classList.add("renderTActive")
		typeRef.current.classList.add("renderTActive")
		setActive(true)

	}
	
	return (
		<div className='renderT' >
			{isTipos?.map((el) => (
				<span
					key={el.name}
					className={el.name}
					ref={typeRef}
					onClick={(event) => {
						event.stopPropagation();
						hacerAlgo(el.name);
					}}>
					{el.name}
				</span>
			))}
		</div>
	);
};

export default RenderTipos;
