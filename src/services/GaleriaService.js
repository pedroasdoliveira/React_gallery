import {Api} from '../helpers/Api.js';

const parseResponse = (response) => response.json();

export const GaleriaService = {
    getLista: () => fetch(Api.galeriaLista(), {method: "GET"}).then(parseResponse),
    getById: (id) => fetch(Api.galeriaById(id), {method: "GET"}).then(parseResponse),
    create: () => fetch(Api.createGaleria(), {method: "POST"}).then(parseResponse),
    updateById: (id) => fetch(Api.updateGaleriaById(id), {method: "PUT"}).then(parseResponse),
    deleteById: (id) => fetch(Api.deleteGaleriaById(id), {method: "DELETE"}).then(parseResponse),

}