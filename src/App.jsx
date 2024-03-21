import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import Index from "./Views/Index.jsx";
import Favoritos from "./Views/Favoritos.jsx";
import MiContextoProveedor from "./context/context.jsx";

import "./App.css";

function App() {
	// useEffect(() => {

	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={
						<MiContextoProveedor>
							<Index />
						</MiContextoProveedor>
					}
				/>
				<Route path='/pokemon/favoritos' element={<Favoritos />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
