import './GaleriaListaItem.css'

const GaleriaListaItem = ({galeria, quantidadeSelecionada, index, onRemove, onAdd, clickItem}) => {
  const badgeCounter = (canRender, index) => {
    return (
      Boolean(canRender) && (
        <span className="GaleriaListaItem__badge">
          {quantidadeSelecionada}
        </span>
      )
    );
  };

  const removeButton = (canRender, index) => {
    return (
      Boolean(canRender) && (
        <button className="delete btn" onClick={(e) => {e.stopPropagation(); onRemove(index);}}>
          Remover
        </button>
      )
    );
  };

  return (
    <div className="GaleriaListaItem" onClick={() => clickItem(galeria.id)}>
      {badgeCounter(quantidadeSelecionada, index)}
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
          <button
            className={`edit btn ${
              !quantidadeSelecionada && `btn--preencher`
            }`}
            onClick={(e) => {e.stopPropagation(); onAdd(index);}}
          >
            Adicionar
          </button>
          {removeButton(quantidadeSelecionada, index)}
        </div>
      </div>
    </div>
  );
};

export default GaleriaListaItem;
