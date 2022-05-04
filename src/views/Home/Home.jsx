import { useState } from "react";
import { ActionMode } from "constants/index.js";
import GaleriaLista from "../../components/GaleriaLista/GaleriaLista.jsx";
import "./Home.css";
import Navbar from "components/Navbar/Navbar.jsx";
import AddGaleriaModal from "components/AddGaleriaModal/AddGaleriaModal.jsx";
import Footer from "components/Footer/Footer.jsx";

const Home = ({ galeriaCriada }) => {
  const [canShowAddGaleriaModal, setCanShowAddGaleriaModal] = useState(false);

  const [galeryForAdd, setGaleryForAdd] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createCard={() => setCanShowAddGaleriaModal(true)}
        updateCard={() => handleActions(ActionMode.ATUALIZAR)}
      />
      {/* Navbar */}
      <div className="Home__container">
        <GaleriaLista galeriaCriada={galeriaCriada} />
        {canShowAddGaleriaModal && (
          <AddGaleriaModal
            closeModal={() => setCanShowAddGaleriaModal(false)}
            onCreateGaleria={(galeria) => setGaleryForAdd(galeria)}
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
