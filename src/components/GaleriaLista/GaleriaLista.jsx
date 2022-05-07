import React, { useState, useEffect, useCallback } from "react";
import "./GaleriaLista.css";
import { ActionMode } from "constants/index.js";
import GaleriaListaItem from "../GaleriaListaItem/GaleriaListaItem.jsx";
import { GaleriaService } from "services/GaleriaService.js";
import GaleriaDetalhesModal from "components/GaleriaDetalhesModal/GaleriaDetalhesModal";

const GaleriaLista = ({ galeriaCriada, mode, updateCard, deleteCard, galeriaEditada, galeriaRemovida }) => {
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
    console.log(galeriaId)
    const response = await GaleriaService.getById(galeriaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setGaleriaModal(response),
      [ActionMode.ATUALIZAR]: () => updateCard(response),
      [ActionMode.DELETAR]: () => deleteCard(response),
    };

    mapper[mode]();
  };

  useEffect(() => {
    getLista();
  }, [galeriaEditada, galeriaRemovida]);

  //-------------------------------------- Adicionar galeria ---------------------------------
  const addGaleriaNaLista = useCallback(
    (galeria) => {
      const lista = [...galerias, galeria];
      setGalerias(lista);
    },
    [galerias]
  );

  useEffect(() => {
    if (
      galeriaCriada &&
      !galerias.map(({ id }) => id).includes(galeriaCriada.id)
    ) {
      addGaleriaNaLista(galeriaCriada);
    }
  }, [addGaleriaNaLista, galeriaCriada, galerias]);

  return (
    <div className="GaleriaLista">
      {galerias.map((galeria, index) => (
        <GaleriaListaItem
          mode={mode}
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
