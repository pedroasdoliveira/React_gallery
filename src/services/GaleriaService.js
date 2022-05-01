import {Api} from '../helpers/Api.js';

const parseResponse = (response) => response.json();

const transformGaleria = (galeria) => {
    return {
        ...galeria,
        id: galeria._id,
    };
};

const parseTransformGaleria = (response) => {
   return parseResponse(response).then((galerias) => {return galerias.map(transformGaleria)});
} 

export const GaleriaService = {
    getLista: () => fetch(Api.galeriaLista(), {method: "GET"}).then(parseTransformGaleria),
    getById: (id) => fetch(Api.galeriaById(id), {method: "GET"}).then(parseResponse),
    create: () => fetch(Api.createGaleria(), {method: "POST"}).then(parseResponse),
    updateById: (id) => fetch(Api.updateGaleriaById(id), {method: "PUT"}).then(parseResponse),
    deleteById: (id) => fetch(Api.deleteGaleriaById(id), {method: "DELETE"}).then(parseResponse),
}
