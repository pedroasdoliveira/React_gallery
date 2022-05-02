import "./GaleriaDetalhesModal.css";
import Modal from "components/Modal/Modal";

const GaleriaDetalhesModal = ({ galeria, closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="GaleriaDetalhesModal">
        <div>
          <div className="GaleriaDetalhesModal__titulo">{galeria.titulo}</div>
          <div className="GaleriaDetalhesModal__tema">{galeria.tema}</div>
          <img
            className="GaleriaDetalhesModal__imagem"
            src={galeria.imagem}
            alt={`Imagem de ${galeria.titulo}`}
          />
          <div className="GaleriaDetalhesModal__ano">{galeria.ano}</div>
          <div className="GaleriaDetalhesModal__descricao">
            {galeria.descricao}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GaleriaDetalhesModal;
