import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import Index from "./Views/Index.jsx";
import Detalle from "./Views/Detalle.jsx";
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
				{/* <Route path='/pokemon/:id' element={<Detalle />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
