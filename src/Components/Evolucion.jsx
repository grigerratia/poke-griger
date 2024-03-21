import React, { useEffect } from "react";
import "../styles/Evolucion.css";

const Evolucion = ({ nameEv, idEv }) => {

	// console.log(dataEv)

	return (
		<div className='evolucion'>
			<div className='evolucion-circulo'>
				<figure>
					<img
						src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" + idEv + ".gif"}
						alt=''
					/>
				</figure>
			</div>
			<div className='evolucion-datos'>
				<div className='evolucion-datos--nombre'>{!nameEv ? "nombre" : nameEv}</div>
			</div>
		</div>
	);
};

export default Evolucion;
