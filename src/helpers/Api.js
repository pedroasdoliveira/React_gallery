const GaleriaContext = {
  galeriaEndpoint: () => `${Api.baseUrl}/galleries`,
  galeriaLista: () => `${GaleriaContext.galeriaEndpoint()}/catalog_images`,
  galeriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/images/${id}`,
  createGaleria: () => `${GaleriaContext.galeriaEndpoint()}/add`,
  updateGaleriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/edit/${id}`,
  deleteGaleriaById: (id) => `${GaleriaContext.galeriaEndpoint()}/delete/${id}`,
};

const SacolaContext = {
  getSacola: () => `${GaleriaContext.galeriaEndpoint()}/all-purchases`,
  createSacola: () => `${GaleriaContext.galeriaEndpoint()}/create-purchases`,
  purchase: () => `${GaleriaContext.galeriaEndpoint()}/finish-purchases`,
}

export const Api = {
  baseUrl: "https://apigaleriaimages-blue.onrender.com",
  ...GaleriaContext,
  ...SacolaContext,
};
