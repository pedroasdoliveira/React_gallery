import { useState } from "react";
import { ActionMode } from "constants/index.js";
import GaleriaLista from "../../components/GaleriaLista/GaleriaLista.jsx";
import "./Home.css";
import Navbar from "components/Navbar/Navbar.jsx";
import AddGaleriaModal from "components/AddGaleriaModal/AddGaleriaModal.jsx";
import Footer from "components/Footer/Footer.jsx";

const Home = () => {
  const [canShowAddGaleriaModal, setCanShowAddGaleriaModal] = useState(false);

  const [galeryForAdd, setGaleryForAdd] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [galeriaEditar, setGaleriaEditar] = useState();
  const [galeriaDeletar, setGaleriaDeletar] = useState();

  const handleUpdateGaleria = (galeriaToUpdate) => {
    setGaleriaEditar(galeriaToUpdate);
    setCanShowAddGaleriaModal(true);
  }

  const handleDeleteGaleria = (galeriaToDelete) => {
    setGaleriaDeletar(galeriaToDelete);
  }

  const handleCloseModal = () => {
    setCanShowAddGaleriaModal(false);
    setGaleryForAdd();
    setGaleriaEditar();
    setGaleriaDeletar();
  }

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createCard={() => setCanShowAddGaleriaModal(true)}
        updateCard={() => handleActions(ActionMode.ATUALIZAR)}
      />
      {/* Navbar */}
      <div className="Home__container">
        <GaleriaLista 
        mode={modoAtual}
        galeriaCriada={galeryForAdd}
        updateCard={handleUpdateGaleria}
        deleteCard={handleDeleteGaleria}
        />
        {canShowAddGaleriaModal && (
          <AddGaleriaModal
            mode={modoAtual}
            galeriaToUpdate={galeriaEditar}
            closeModal={handleCloseModal}
            onCreateGaleria={(galeria) => setGaleryForAdd(galeria)}
            // onUpdateGaleria={(galeria) => setGaleriaEditar(galeria)}
          />
        )}
      </div>
      {/* GaleriaLista */}
      <div className="Home__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
