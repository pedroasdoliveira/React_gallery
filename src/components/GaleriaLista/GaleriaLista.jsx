import React, { useState } from "react";
import { galerias } from "../../mocks/Galeria.js";
import "./GaleriaLista.css";
import GaleriaListaItem from "../GaleriaListaItem/GaleriaListaItem.jsx";

const GaleriaLista = () => {
  const [galeriaSelecionada, setGaleriaSelecionada] = useState({});

  const adicionarItem = (galeriaIndex) => {
    const galeria = {
      [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) +1,
    };
    setGaleriaSelecionada({ ...galeriaSelecionada, ...galeria });
  };

  const removerItem = (galeriaIndex) => {
      const galeria = {
        [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) -1,
      };
      setGaleriaSelecionada({...galeriaSelecionada, ...galeria});
  }

  return (
    <div className="GaleriaLista">
      {galerias.map((galeria, index) => (
        <GaleriaListaItem 
        key={`GaleriaListaItem-${index}`}
        galeria={galeria}
        quantidadeSelecionada={galeriaSelecionada[index]}
        index={index}
        onAdd={index => adicionarItem(index)}
        onRemove={index => removerItem(index)} />
      ))}
    </div>
  );
};

export default GaleriaLista;
