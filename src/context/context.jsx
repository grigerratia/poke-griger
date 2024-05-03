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
	const [beforeEvolution, setBeforeEvolution] = useState([]);
	const [nextEvolution, setNextEvolution] = useState([]);
	const [evolChainGot, setEvolChainGot] = useState([])
	const [idDataCard, setIdDataCard] = useState([])
	const [lengthBatch, setLengthBatch] = useState({
		initBatch: 1,
		endBatch: 12
	})
	const [count, setCount] = useState(1)
	const [firstNum, setFirstNum] = useState([1, 2, 3, 4, 5, 6])
	const [allPokemons, setAllPokemons] = useState(null)

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
				setListPokemons,
				beforeEvolution,
				setBeforeEvolution,
				nextEvolution,
				setNextEvolution,
				evolChainGot,
				setEvolChainGot,
				idDataCard,
				setIdDataCard,
				lengthBatch,
				setLengthBatch,
				count,
				setCount,
				firstNum,
				setFirstNum,
				allPokemons,
				setAllPokemons
			}}>
			{children}
		</MiContexto.Provider>
	);
}
