//GUARDA EL ID DEL POKEMON A PARTIR DE LA URL
export function getIdOfUrl(chain) {
  const cadena = chain.slice(0, -1)
  const ultimaBarra = cadena.lastIndexOf("/");
  const numero = cadena.slice(ultimaBarra + 1);
  return parseInt(numero);
}