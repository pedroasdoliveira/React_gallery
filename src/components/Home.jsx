import GaleriaLista from "./GaleriaLista.jsx";
import "./Home.css";
import icon from "../assets/icons/galery-icon.svg";

const Home = () => {
  return (
    <div className="Home">
      <header className="Header">
        <div className="Header__row">
          <div className="Description">
            <h1 className="Description__title">Galeria</h1>
          </div>
          <div className="Galeries">
            <div className="Images">
                <img className="Images__icon" src={icon} alt="Icone de galerias" />
            </div>
          </div>
        </div>
      </header>

      <div className="Home__container">
        <GaleriaLista />
      </div>
    </div>
  );
};

export default Home;
