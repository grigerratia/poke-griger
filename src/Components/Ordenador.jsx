import React from "react";
import "../styles/Ordenador.css";

const Ordenador = () => {
	return (
		<div className='ordenador'>
			<div className='ordenar'>Ordenar</div>
			<ul>
				<li value='numero-superior'>Número superior</li>
				<li value='numero-inferior'>Número inferior</li>
				<li value='a-z'>A - Z</li>
				<li value='z-a'>Z - A</li>
			</ul>
		</div>
	);
};

export default Ordenador;
