import React, { useEffect } from "react";
import "../styles/Evolucion.css";

const Evolucion = ({ urlEvol }) => {

	return (
		<div className='evolucion'>
			<div className='evolucion-circulo'>
				<figure>
					<img
						src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" + 5 + ".gif"}
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
