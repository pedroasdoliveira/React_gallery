import React, { useState, useEffect, useCallback } from "react";
import "./GaleriaLista.css";
import { ActionMode } from "constants/index.js";
import GaleriaListaItem from "../GaleriaListaItem/GaleriaListaItem.jsx";
import { GaleriaService } from "services/GaleriaService.js";
import GaleriaDetalhesModal from "components/GaleriaDetalhesModal/GaleriaDetalhesModal";
import { matchByText } from "helpers/Utils.js";

const GaleriaLista = ({
  galeriaCriada,
  mode,
  updateCard,
  deleteCard,
  galeriaEditada,
  galeriaRemovida,
}) => {
  const selecionadas = JSON.parse(localStorage.getItem("selecionada")) ?? {};

  const [galerias, setGalerias] = useState([]);

  const [galeriasFiltradas, setGaleriasFiltradas] = useState([]);

  const [galeriaSelecionada, setGaleriaSelecionada] = useState(selecionadas);

  const [galeriaModal, setGaleriaModal] = useState(false);

  const adicionarItem = (galeriaIndex) => {
    const galeria = {
      [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) + 1,
    };
    setGaleriaSelecionada({ ...galeriaSelecionada, ...galeria });
  };

  const setSelecionadas = useCallback(() => {
    if (!galerias.length) return;

    const entries = Object.entries(galeriaSelecionada);
    const sacola = entries.map((arr) => ({
      galeriaId: galerias[arr[0]]._id,
      quantidade: arr[1],
    }));

    localStorage.setItem("sacola", JSON.stringify(sacola));
    localStorage.setItem("selecionadas", JSON.stringify(galeriaSelecionada));
  }, [galeriaSelecionada, galerias]);

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
    console.log(galeriaId);
    const response = await GaleriaService.getById(galeriaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setGaleriaModal(response),
      [ActionMode.ATUALIZAR]: () => updateCard(response),
      [ActionMode.DELETAR]: () => deleteCard(response),
    };

    mapper[mode]();
  };

  const filtroPorTitulo = ({ target }) => {
    const lista = [...galerias].filter(({ titulo }) =>
      matchByText(titulo, target.value)
    );
    setGaleriasFiltradas(lista);
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
    setSelecionadas();
  }, [setSelecionadas, galeriaSelecionada]);

  useEffect(() => {
    if (
      galeriaCriada &&
      !galerias.map(({ id }) => id).includes(galeriaCriada.id)
    ) {
      addGaleriaNaLista(galeriaCriada);
    }
    setGaleriasFiltradas(galerias);
  }, [addGaleriaNaLista, galeriaCriada, galerias]);

  return (
    <div className="GaleriaLista-Wrapper">
      <input 
        className="GaleriaLista-filtro"
        onChange={filtroPorTitulo}
        placeholder="Digite o título do Card que será pesquisado" />

      <div className="GaleriaLista">
        {galeriasFiltradas.map((galeria, index) => (
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
    </div>
  );
};

export default GaleriaLista;
