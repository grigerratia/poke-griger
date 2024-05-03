import React from "react";
import "../styles/SelectPeso.css";

const SelectPeso = () => {
	return (
		<div className='selectP'>
			<h4>Altura</h4>
			<div className='alturas'>
				<div className='selectAItem'>
					<img src='./img/peso.png' alt='pequeño' />
				</div>
				<div className='selectAItem'>
					<img src='./img/peso.png' alt='mediano' />
				</div>
				<div className='selectAItem'>
					<img type='gif' src='./img/peso.png' alt='grande' />
				</div>
			</div>
		</div>
	);
};

export default SelectPeso;
