import "./Navbar.css";
import icon from "../../assets/icons/galery-icon.svg";
import {GrAdd} from 'react-icons/gr';

const Navbar = ({createCard}) => {
  return (
    <header className="Header">
      <div className="Header__row">
        <div className="Description">
          <h1 className="Description__title">Galeria</h1>
        </div>
        <div className="Galeries">
          <button className="Create" type="button" onClick={() => createCard()}>
            <GrAdd />
          </button>
          <div className="Images">
            <img className="Images__icon" src={icon} alt="Icone de galerias" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
