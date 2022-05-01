const GaleriaContext = {
    galeriaEndpoint: () => `${Api.baseUrl}/galleries`,
    galeriaLista: () => `${GaleriaContext.galeriaEndpoint()}/catalog_images`,
    galeriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/images/${id}`,
    createGaleria: () => `${GaleriaContext.galeriaEndpoint()}/add`,
    updateGaleriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/edit/${id}`,
    deleteGaleriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/delete/${id}`,
};

export const Api = {
    baseUrl: "http://localhost:3005",
    ...GaleriaContext
};