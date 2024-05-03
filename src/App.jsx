import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import Index from "./Views/Index.jsx";
import Favorites from "./Views/Favorites.jsx";
import MiContextoProveedor from "./context/context.jsx";

import "./App.css";

function App() {

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

				<Route
					path='/favorites'
					element={
						<MiContextoProveedor>
							<Favorites />
						</MiContextoProveedor>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
