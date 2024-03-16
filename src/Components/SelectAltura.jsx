import React from "react";
import "../styles/SelectAltura.css";

const SelectAltura = () => {
	return (
		<div className='selectA'>
			<h4>Altura</h4>
			<div className='alturas'>
				<div className='selectAItem'>
					<img src='../../public/img/25.gif' alt='pequeño' />
				</div>
				<div className='selectAItem'>
					<img src='../../public/img/6.gif' alt='mediano' />
				</div>
				<div className='selectAItem'>
					<img type="gif" src='../../public/img/384.gif' alt='grande' />
				</div>
			</div>
		</div>
	);
};

export default SelectAltura;
