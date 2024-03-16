import { capitalize } from "@mui/material";
import { POKE_API } from "./url";

export function getPokemon(parametro) {
	return fetch(POKE_API + parametro.toLowerCase());
}
