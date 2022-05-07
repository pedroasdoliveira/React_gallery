import "./DeletarGaleriaModal.css";
import Modal from "components/Modal/Modal";
import { GaleriaService } from "services/GaleriaService.js";

const DeletarGaleriaModal = ({
  closeModal,
  galeriaToDelete,
  onDeleteGaleria,
}) => {
  const handleDelete = async (galeria) => {
    await GaleriaService.deleteById(galeria._id);
    onDeleteGaleria(galeria);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="DeleteGaleriaModal">
        <h2>Confirmação</h2>
        <p>
          Você deseja remover o Card <b>{galeriaToDelete.titulo}</b> da galeria?
        </p>
        <img
          className="DeletarGaleriaModal__imagem"
          src={galeriaToDelete.imagem}
          alt={galeriaToDelete.titulo}
        />
      </div>
      <br />
      <div>
        <button
          onClick={() => handleDelete(galeriaToDelete)}
          className="DeletarGaleriaModal__confirmar"
        >
          {""}
          Confirmar{""}
        </button>
        <button onClick={closeModal} className="DeletarGaleriaModal__cancelar">
          {""}
          Cancelar{""}
        </button>
      </div>
    </Modal>
  );
};

export default DeletarGaleriaModal;
