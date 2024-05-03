import React, { useContext, useEffect, useState } from "react";
import Header from "../layout/Header";
import Main from "../layout/Main";
import Footer from "../layout/Footer";
import BuscadorAvanzado from "../layout/BuscadorAvanzado";
import { MiContexto } from "../context/context";
import "../styles/Index.css";
import PokeDetails from "../layout/PokeDetails";
import { getPokemon } from "../utils/getPokemon";
import Charging from "./Charging";



const Index = () => {

	const { verOpcionesAv, verPokeDe, allPokemons, setAllPokemons } = useContext(MiContexto);

	useEffect(() => {

		getPokemon("?limit=100000&offset=0")
			.then(res => res.json())
			.then(data => {
				setAllPokemons(data.results)
			})

	}, [])


	if (allPokemons) {
		return (
			<div className='index'>
				<Header />
				<Main />
				<Footer />
				{verOpcionesAv && <BuscadorAvanzado />}
				{verPokeDe && <PokeDetails />}
			</div>
		);
	}

	return <Charging />

};

export default Index;
