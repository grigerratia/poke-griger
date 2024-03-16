import React, { useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/BotonAvanzado.css";

const BotonAvanzado = () => {
	const opAvanzadas = useContext(MiContexto);

	const toggleOpAv = () => {
		opAvanzadas.verOpcionesAv
			? opAvanzadas.setVerOpcionesAv(false)
			: opAvanzadas.setVerOpcionesAv(true);
	};

	return (
		<div className='botonAvanzado'>
			<button onClick={toggleOpAv}>Búsqueda avanzada</button>
		</div>
	);
};

export default BotonAvanzado;
