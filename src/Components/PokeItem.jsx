import { useEffect, useState, useContext } from "react";
import { MiContexto } from "../context/context";
import "../styles/PokeItem.css";

const PokeItem = ({ data }) => {
	const [dataP, setDataP] = useState();
	const [id, setId] = useState("");
	const [image, setImage] = useState("");
	// let image1 =
	// 	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" +
	// 	id +
	// 	".gif";

	const context = useContext(MiContexto);
	const { setDataCard, setVerPokeList } = context;



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
	}, []);

	return (
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
	);
};

export default PokeItem;
