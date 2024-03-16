import React, { useContext, useEffect } from "react";
import { MiContexto } from "../context/context";
import Buscador from "../Components/Buscador";
import BotonSorpresa from "../Components/BotonSorpresa";
import BotonAvanzado from "../Components/BotonAvanzado";
import Ordenador from "../Components/Ordenador";
import CardContainer from "../layout/CardContainer";
import PokeList from "./PokeList";
import PokeCard from "../Components/PokeCard";
import "../styles/Main.css";

const Main = () => {
	const mostrarLista = useContext(MiContexto);

	return (
		<main>
			<div className='main-r'>
				<div className='titlePage'>
					<h1>
						<span>Busca</span> Pokemons <br />
						Ordena la Lista <br />
						Búsqueda <span>Avanzada</span> <br />
						<span>Marca</span> tus favoritos
					</h1>
					<p>
						Ordena la lista de tus pokemon, explora la búsqueda avanzada y marca
						tus Pokemons favoritos.
					</p>
				</div>
			</div>

			<div className='main-d'>
				<Buscador />
				<BotonAvanzado />

				<div className='botones'>
					<BotonSorpresa />
					<Ordenador />
				</div>
				<div className='cards-layout'>
					{mostrarLista.verPokeList && <PokeList />}
					{!mostrarLista.verPokeList && <PokeCard />}
				</div>
			</div>
		</main>
	);
};

export default Main;
