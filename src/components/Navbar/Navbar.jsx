import "./Navbar.css";
import { ActionMode } from "constants/index.js";
import icon from "../../assets/icons/galery-icon.svg";
import { GrAdd } from "react-icons/gr";
import { RiImageEditLine } from "react-icons/ri";
import {FcRemoveImage} from 'react-icons/fc';

const Navbar = ({ createCard, updateCard, mode, deleteCard }) => {
  return (
    <header className="Header">
      <div className="Header__row">
        <div className="Description">
          <h1 className="Description__title">Galeria</h1>
        </div>
        <div className="Galeries">
          <button 
            className={`Update Galery ${
              mode === ActionMode.ATUALIZAR && "Card--Ativo"
            }`}
            type="button"
            onClick={() => updateCard()}
          > 
            <RiImageEditLine />
          </button>
          {/* button update */}
          <button
            type="button"
            className={`Delete Galery ${
              mode === ActionMode.DELETAR && 'Card-Ativo'
            }`}
            onClick={() => deleteCard()}
            >
              <FcRemoveImage />
          </button>
          {/* button delete */}
          <button
            className="Create Galery"
            type="button"
            onClick={() => createCard()}
          >
            <GrAdd />
          </button>
          {/* button create */}
          <div className="Images">
            <img className="Images__icon" src={icon} alt="Icone de galerias" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
