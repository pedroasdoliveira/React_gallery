import React, { useState } from "react";
import { galerias } from "../mocks/Galeria.js";
import "./GaleriaLista.css";

const GaleriaLista = () => {
  const [galeriaSelecionada, setGaleriaSelecionada] = useState({});

  const adicionarItem = (galeriaIndex) => {
    const galeria = {
      [galeriaIndex]: Number(galeriaSelecionada[galeriaIndex] || 0) + 1,
    };
    setGaleriaSelecionada({ ...galeriaSelecionada, ...galeria });
  };

  return (
    <div className="GaleriaLista">
      {galerias.map((galeria, index) => (
        <div className="GaleriaListaItem" key={`GaleriaListaItem-${index}`}>
          <span className="GaleriaListaItem__badge">
            {galeriaSelecionada[index] || 0}
          </span>
          <div>
            <div className="GaleriaListaItem__titulo">{galeria.titulo}</div>
            <div className="GaleriaListaItem__tema">{galeria.tema}</div>
            <img
              className="GaleriaListaItem__imagem"
              src={galeria.imagem}
              alt={`Imagem ${galeria.titulo}`}
            />
            <div className="GaleriaListaItem__ano">{galeria.ano}</div>
            <div className="GaleriaListaItem__descr">{galeria.descricao}</div>
            <div className="GaleriaListaItem__btns">
              <button className="edit btn" onClick={() => adicionarItem(index)}>
                Adicionar
              </button>
              <button className="delete btn">Deletar</button>
            </div>
            {/* <div className='GaleriaListaItem__acoes Acoes'>
                            <button className='Acoe__adicionar Acoe__adicionar--preencher' onClick={() => adicionarItem(index)}>Adicionar</button>
                        </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GaleriaLista;
