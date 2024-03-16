import React, { useContext } from "react";
import RenderTipos from "../Components/RenderTipos";
import RenderHabilidades from "../Components/RenderHabilidades";
import SelectAltura from "../Components/SelectAltura";
import SelectPeso from "../Components/SelectPeso";
import { MiContexto } from "../context/context";
import "../styles/BuscadorAvanzado.css";

const ImputRango = ({ placeholder }) => {
	return (
		<input
			type='text'
			name='rango-sup'
			id='rango-sup'
			placeholder={placeholder}
		/>
	);
};

const BuscadorAvanzado = () => {
	const opAvanzadas = useContext(MiContexto);
	const toggleOpAv = () => {
		opAvanzadas.verOpcionesAv
			? opAvanzadas.setVerOpcionesAv(false)
			: opAvanzadas.setVerOpcionesAv(true);
	};
	return (
		<div className='containerContendorAvanzado'>
			<div className='buscadorAvanzado'>
				<span className='btnSalirAv' onClick={toggleOpAv}>
					<img src='../../public/img/equis.png' alt='salir del modal' />
				</span>
				<div className='buscadorOpciones'>
					<div className='tipDebRan'>
						<div className='tipoDebilidad'>
							<div className='tipo'>
								<h4>Tipo:</h4>
								<RenderTipos />
							</div>

							<div className='debilidad'>
								<h4>Debilidad:</h4>
								<RenderTipos />
							</div>
						</div>

						<div className='rango'>
							<fieldset>
								<legend>
									<h4>Rango</h4>
								</legend>
								<ImputRango placeholder={"1"} />
								<span>_</span>
								<ImputRango placeholder={"1025"} />
							</fieldset>
						</div>
					</div>
					<div className='abiAltPes'>
						<div className='abilidad'>
							<RenderHabilidades />
						</div>
						<div className='altura'>
							<SelectAltura />
						</div>
						<div className='peso'>
							<SelectPeso />
						</div>
					</div>
				</div>
				<div className='buscadorBotones'>
					<div className='btnRestablecerAvanzado'>Restablecer</div>
					<div className='btnBuscarAvanzado'>Buscar</div>
				</div>
			</div>
		</div>
	);
};

export default BuscadorAvanzado;
