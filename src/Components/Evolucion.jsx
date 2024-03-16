import React from "react";
import "../styles/Evolucion.css";

const Evolucion = () => {
	return (
		<div className='evolucion'>
			<div className='evolucion-circulo'>
				<figure>
					<img
						src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
						alt=''
					/>
				</figure>
			</div>
			<div className='evolucion-datos'>
				<div className='evolucion-datos--nombre'>Nombre</div>
			</div>
		</div>
	);
};

export default Evolucion;
