// context.js
import { createContext, useState } from "react";

export const MiContexto = createContext({});

export default function MiContextoProveedor({ children }) {
	const [verOpcionesAv, setVerOpcionesAv] = useState(false);
	const [verPokeDe, setVerPokeDe] = useState(false);
	const [verPokeList, setVerPokeList] = useState(true);
	const [dataCard, setDataCard] = useState({});
	const [filteredList, setFilteredList] = useState(false);
	const [listPokemons, setListPokemons] = useState([]);



	return (
		<MiContexto.Provider
			value={{
				verOpcionesAv,
				setVerOpcionesAv,
				verPokeDe,
				setVerPokeDe,
				dataCard,
				setDataCard,
				verPokeList,
				setVerPokeList,
				filteredList,
				setFilteredList,
				listPokemons,
				setListPokemons
			}}>
			{children}
		</MiContexto.Provider>
	);
}
