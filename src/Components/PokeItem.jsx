import { useEffect, useState, useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokeItem.css";

const PokeItem = ({ data }) => {
	const [dataP, setDataP] = useState();
	const [id, setId] = useState("");
	const [image, setImage] = useState("");
	const [corazon, setCorazon] = useState("./img/corazon-lleno.png");

	const context = useContext(MiContexto);
	const { setDataCard, setVerPokeList, favorite, setFavorite } = context;

	// const setHartIcon = () => {
	// 	const thisFavorite = JSON.parse(localStorage.getItem("Favorites"))
	// 	thisFavorite.find(el => el === dataP?.name)
	// 		? setCorazon("./img/corazon.png")
	// 		: setCorazon("./img/corazon-lleno.png")
	// }


	const addToFavorites = (namePokemon) => {
		if (localStorage.getItem("Favorites")) {
			const thisFavorite = JSON.parse(localStorage.getItem("Favorites"))
			if (thisFavorite.includes(namePokemon)) {
				const actualFavorites = JSON.parse(localStorage.getItem("Favorites"))
				const newFavorites = actualFavorites.filter((el) => el != namePokemon)
				localStorage.setItem("Favorites", JSON.stringify(newFavorites))
				//setHartIcon()
				return
			}
			setFavorite(JSON.parse(localStorage.getItem("Favorites")))
			setFavorite(favorite.push(namePokemon))
			localStorage.setItem("Favorites", JSON.stringify(favorite))
			//setHartIcon()
			return
		}
		setFavorite(favorite.push(namePokemon))
		localStorage.setItem("Favorites", JSON.stringify(favorite))
		//setHartIcon()
	}

	const verCard = () => {
		setDataCard(dataP);
		setVerPokeList(false);
	};

	useEffect(() => {
		fetch(data.url)
			.then((res) => res.json())
			.then((datos) => {
				setDataP(datos);
				setId(datos.id);
				return datos
			})
			.then(dato => dato.sprites.other)
			.then(dato => {
				dato["showdown"].front_default
					? setImage(dato["showdown"].front_default)
					: setImage(dato["official-artwork"].front_default)
			})

		//setHartIcon()
	}, [dataP, favorite, corazon, id]);

	return (
		<>
			<div className="pokeItemContainer">
				<div className='pokeItem' onClick={verCard}>
					<div className='datosItem'>
						<p className='nombre'>{dataP?.name}</p>
						<p className='numero'>{"#" + dataP?.id}</p>
					</div>
					<picture>
						<img
							src={image}
							alt={dataP?.name}
						/>
					</picture>
				</div>
				<div className="addFavorite"
					onClick={(event) => {
						event.stopPropagation();
						addToFavorites(dataP?.name);
					}}
				>
					{/* <img src={corazon} />  */}
				</div>


			</div>
		</>
	);
};

export default PokeItem;
