import React, { useContext } from "react";
import Header from "../layout/Header";
import Main from "../layout/Main";
import Footer from "../layout/Footer";
import BuscadorAvanzado from "../layout/BuscadorAvanzado";
import { MiContexto } from "../context/context";
import "../styles/Index.css";
import PokeDetails from "../layout/PokeDetails";

const Index = () => {
	const opAvanzadas = useContext(MiContexto);
	const pokeDet = useContext(MiContexto);
	return (
		<div className='index'>
			<Header />
			<Main />
			<Footer />
			{opAvanzadas.verOpcionesAv && <BuscadorAvanzado />}
			{pokeDet.verPokeDe && <PokeDetails />}
		</div>
	);
};

export default Index;
