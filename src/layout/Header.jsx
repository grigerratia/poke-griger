import React from "react";
import Redes from "../Components/Redes";
import "../styles/Header.css";

const Header = () => {

	const goToHome = () => {
		location.href = '/';
	}

	return (
		<header>
			<picture>
				<img src='/img/pokeball-icom.png' alt='' width={"30px"} onClick={goToHome} />
			</picture>
			<Redes />
		</header>
	);
};

export default Header;
