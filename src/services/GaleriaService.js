import { Api } from "../helpers/Api.js";

const parseResponse = (response) => response.json();

// const transformGaleria = (galeria) => {
//   return {
//     ...galeria,
//     _id: galeria._id,
//   };
// };

// const parseTransformGaleria = (response) => {
//   return parseResponse(response).then((galerias) => {
//     return galerias.map(transformGaleria);
//   });
// };

// const parseTransformItem = (response) => {
//   return parseResponse(response).then(transformGaleria);
// };

export const GaleriaService = {
  getLista: () =>
    fetch(Api.galeriaLista(), { method: "GET" }).then(parseResponse),
  getById: (id) =>
    fetch(Api.galeriaById(id), { method: "GET" }).then(parseResponse),
  create: (galeria) =>
    fetch(Api.createGaleria(), {
      method: "POST",
      body: JSON.stringify(galeria),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    }).then(parseResponse),
  updateById: (id, galeria) =>
    fetch(Api.updateGaleriaById(id), { method: "PUT", body: JSON.stringify(galeria), mode: "cors", headers:{
      "Content-Type": "application/json",
    } }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deleteGaleriaById(id), { method: "DELETE" }).then(parseResponse),
};
