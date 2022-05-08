import { useState } from "react";
import { ActionMode } from "constants/index.js";
import GaleriaLista from "../../components/GaleriaLista/GaleriaLista.jsx";
import "./Home.css";
import Navbar from "components/Navbar/Navbar.jsx";
import AddGaleriaModal from "components/AddGaleriaModal/AddGaleriaModal.jsx";
import DeletarGaleriaModal from "components/DeletarGaleriaModal/DeletarGaleriaModal.jsx";
import SacolaModal from "components/SacolaModal/SacolaModal.jsx";
import { SacolaService } from "services/SacolaService.js";
import Footer from "components/Footer/Footer.jsx";

const Home = () => {
  const [canOpenBag, setCanOpenBag] = useState();

  const [canShowAddGaleriaModal, setCanShowAddGaleriaModal] = useState(false);

  const [galeryForAdd, setGaleryForAdd] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [galeriaEditar, setGaleriaEditar] = useState();
  const [galeriaDeletar, setGaleriaDeletar] = useState();

  const [galeriaEditada, setGaleriaEditada] = useState();
  const [galeriaRemovida, setGaleriaRemovida] = useState();

  const handleUpdateGaleria = (galeriaToUpdate) => {
    setGaleriaEditar(galeriaToUpdate);
    setCanShowAddGaleriaModal(true);
  };

  const handleDeleteGaleria = (galeriaToDelete) => {
    setGaleriaDeletar(galeriaToDelete);
  };

  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem('sacola'));
    const sacola = lista.filter(i => i.quantidade > 0);

    await SacolaService.create(sacola);

    setCanOpenBag(true)
  }

  const handleCloseModal = () => {
    setCanShowAddGaleriaModal(false);
    setGaleryForAdd();
    setGaleriaEditar();
    setGaleriaDeletar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createCard={() => setCanShowAddGaleriaModal(true)}
        updateCard={() => handleActions(ActionMode.ATUALIZAR)}
        deleteCard={() => handleActions(ActionMode.DELETAR)}
        openBag={abrirSacola}
      />
      {/* Navbar */}
      <div className="Home__container">
        <GaleriaLista
          mode={modoAtual}
          galeriaCriada={galeryForAdd}
          galeriaEditada={galeriaEditada}
          galeriaRemovida={galeriaRemovida}
          updateCard={handleUpdateGaleria}
          deleteCard={handleDeleteGaleria}
        />
        {canShowAddGaleriaModal && (
          <AddGaleriaModal
            mode={modoAtual}
            galeriaToUpdate={galeriaEditar}
            onUpdateGaleria={(galeria) => setGaleriaEditada(galeria)}
            closeModal={handleCloseModal}
            onCreateGaleria={(galeria) => setGaleryForAdd(galeria)}
          />
        )}
        {
          galeriaDeletar &&
          <DeletarGaleriaModal
          galeriaToDelete={galeriaDeletar}
          closeModal={handleCloseModal}
          onDeleteGaleria={(galeria) => setGaleriaRemovida(galeria)}
          />
        }
        {
          canOpenBag &&
          <SacolaModal closeModal={() => setCanOpenBag(false)} />
        }
      </div>
      {/* GaleriaLista */}
      <div className="Home__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
