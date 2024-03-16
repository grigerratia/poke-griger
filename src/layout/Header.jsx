import React from "react";
import Redes from "../Components/Redes";
import "../styles/Header.css";

const Header = () => {
	return (
		<header>
			<picture>
				<img src='/img/pokeball-icom.png' alt='' width={"30px"} />
			</picture>
			<Redes />
		</header>
	);
};

export default Header;
