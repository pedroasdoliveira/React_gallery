import React, { useState, useEffect } from "react";
import "./GaleriaLista.css";
import GaleriaListaItem from "../GaleriaListaItem/GaleriaListaItem.jsx";
import { GaleriaService } from "services/GaleriaService.js";
import GaleriaDetalhesModal from "components/GaleriaDetalhesModal/GaleriaDetalhesModal";

const GaleriaLista = () => {
  const [galerias, setGalerias] = useState([]);

  const [galeriaSelecionada, setGaleriaSelecionada] = useState({});

  const [galeriaModal, setGaleriaModal] = useState(false);

  const adicionarItem = (galeriaIndex) => {
    const galeria = {
      [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) + 1,
    };
    setGaleriaSelecionada({ ...galeriaSelecionada, ...galeria });
  };

  const removerItem = (galeriaIndex) => {
    const galeria = {
      [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) - 1,
    };
    setGaleriaSelecionada({ ...galeriaSelecionada, ...galeria });
  };

  const getLista = async () => {
    const response = await GaleriaService.getLista();

    setGalerias(response);
  };

  const getItem = async (galeriaId) => {
    const response = await GaleriaService.getById(galeriaId);

    setGaleriaModal(response);
  };

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="GaleriaLista">
      {galerias.map((galeria, index) => (
        <GaleriaListaItem
          key={`GaleriaListaItem-${index}`}
          galeria={galeria}
          quantidadeSelecionada={galeriaSelecionada[index]}
          index={index}
          onAdd={(index) => adicionarItem(index)}
          onRemove={(index) => removerItem(index)}
          clickItem={(galeriaId) => getItem(galeriaId)}
        />
      ))}
      {galeriaModal && (
        <GaleriaDetalhesModal
          galeria={galeriaModal}
          closeModal={() => setGaleriaModal(false)}
        />
      )}
    </div>
  );
};

export default GaleriaLista;
