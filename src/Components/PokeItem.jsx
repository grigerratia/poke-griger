import { useEffect, useState, useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokeItem.css";

const PokeItem = ({ data }) => {
	const [dataP, setDataP] = useState();
	const [id, setId] = useState("");
	const [image, setImage] = useState("");
	const [favorite, setFavorite] = useState(JSON.parse(localStorage.getItem("Favorites")));
	// let image1 =
	// 	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
	// 	id +
	// 	".gif";

	const context = useContext(MiContexto);
	const { setDataCard, setVerPokeList } = context;


	const addToFavorites = (namePokemon) => {
		if (localStorage.getItem("Favorites")) {
			setFavorite(JSON.parse(localStorage.getItem("Favorites")))
			setFavorite(favorite.push(namePokemon))
			localStorage.setItem("Favorites", JSON.stringify(favorite))
			return
		}
		setFavorite([namePokemon])
		localStorage.setItem("Favorites", JSON.stringify(favorite))
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
	}, [favorite]);

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
					{
						favorite?.find(el => el === dataP?.name)
							? <img src="./img/corazon.png" alt="" />
							: <img src="./img/corazon-lleno.png" alt="" />
					}

				</div>


			</div>
		</>
	);
};

export default PokeItem;
