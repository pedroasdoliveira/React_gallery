import { useEffect, useState } from "react";
import "./SacolaModal.css";
import Modal from "components/Modal/Modal";
import { SacolaService } from "services/SacolaService.js";
import { GaleriaService } from "services/GaleriaService";

const SacolaModal = ({ closeModal }) => {
  const [lista, setLista] = useState([]);

  const purchase = async () => {
    await SacolaService.purchase();
  };

  const handleClose = async () => {
    await SacolaService.purchase();
    closeModal();
  };

  const getLista = async () => {
    const galeriaLista = await GaleriaService.getLista();
    const sacolaLista = await SacolaService.getLista();

    const encontraNome = (id) => {
      const obj = galeriaLista.find((i) => i._id === id);
      return (obj && obj.titulo) ?? "";
    };

    if (Array.isArray(sacolaLista)) {
      const novaLista = sacolaLista.map(({ galeriaId, quantidade }) => ({
        nome: encontraNome(galeriaId),
        quantidade,
      }));

      setLista(novaLista);
    }
  };

  useEffect(() => {
    getLista();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="SacolaModal">
        <h2>Galerias & Quantidades</h2>

        <div>
          {lista.map((i, idx) => (
            <div key={idx}>
              {""}
              {i.nome + " " + i.quantidade + "x"}
              <br />
            </div>
          ))}
        </div>
        <br />
        <div>
          <button onClick={purchase} className="SacolaModal__confirmar">
            {" "}
            Fechar pedido{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SacolaModal;
