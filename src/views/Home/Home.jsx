import { useState } from "react";
import GaleriaLista from "../../components/GaleriaLista/GaleriaLista.jsx";
import "./Home.css";
import Navbar from "components/Navbar/Navbar.jsx";
import AddGaleriaModal from "components/AddGaleriaModal/AddGaleriaModal.jsx";
import Footer from "components/Footer/Footer.jsx";

const Home = ({galeriaCriada}) => {
  const [canShowAddGaleriaModal, setCanShowAddGaleriaModal] = useState(false);

  const [galeryForAdd, setGaleryForAdd] = useState();

  return (
    <div className="Home">
      <Navbar createCard={() => setCanShowAddGaleriaModal(true)} />
      <div className="Home__container">
        <GaleriaLista galeriaCriada={galeriaCriada} />
        {
          canShowAddGaleriaModal && (<AddGaleriaModal closeModal={() => setCanShowAddGaleriaModal(false)} 
          onCreateGaleria = {(galeria) => setGaleryForAdd(galeria)} />)
        }
      </div>
      <div className="Home__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
