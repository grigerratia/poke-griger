import React from "react";
import "../styles/Redes.css";

const Redes = () => {

	const irAFavorites = () => {
		location.href = '/favorites';
	}

	return (
		<nav>
			<ul>
				<li>f</li>
				<li>in</li>
				<li>x</li>
				{
					!location.pathname.includes("favorites") && <li onClick={irAFavorites}>favoritos</li>
				}

			</ul>
		</nav>
	);
};

export default Redes;
