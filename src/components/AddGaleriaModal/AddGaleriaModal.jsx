import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AddGaleriaModal.css";
import { GaleriaService } from "services/GaleriaService.js";

const AddGaleriaModal = ({ closeModal, onCreateGaleria }) => {
  const form = {
    titulo: "",
    tema: "",
    imagem: "",
    ano: "",
    descricao: "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
      const response = !Boolean(
          state.descricao.length 
          && state.imagem.length
          && state.ano.length
          && state.tema.length
          && state.titulo.length
      )

      setCanDisable(response)
  }

  useEffect(() => {
      canDisableSendButton();
  })

  const createGaleria = async () => {
    const renamePathImages = (imagePath) => imagePath.split('\\').pop();

    const {titulo, tema, imagem, ano, descricao} = state;

    const galeria = {
      titulo: titulo,
      tema, 
      ano, 
      descricao,
      imagem: `assets/image/${renamePathImages(imagem)}`
    }

    const response = await GaleriaService.create(galeria);
    onCreateGaleria(response);
    closeModal();
  }

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="AddGaleriaModal">
          <form autoComplete="off">
            <h2>Adicionar Card</h2>
            <div>
              <label className="AddGaleriaModal__text" htmlFor="titulo">
                Titulo:
              </label>
              <input
                id="titulo"
                type="text"
                placeholder="Digite o titulo de seu Card"
                value={state.titulo}
                onChange={(e) => handleChange(e, "titulo")}
                required
              />
            </div>
            <div>
              <label className="AddGaleriaModal__text" htmlFor="tema">
                Tema:
              </label>
              <input
                id="tema"
                type="text"
                placeholder="Digite o tema correspondente de sua imagem"
                value={state.tema}
                onChange={(e) => handleChange(e, "tema")}
                required
              />
            </div>
            <div>
              <label className="AddGaleriaModal__text" htmlFor="ano">
                Ano de publicação:
              </label>
              <input
                id="ano"
                type="text"
                placeholder="Digite o Ano de publicação de sua imagem"
                value={state.ano}
                onChange={(e) => handleChange(e, "ano")}
                required
              />
            </div>
            <div>
              <label className="AddGaleriaModal__text" htmlFor="descricao">
                Descrição:
              </label>
              <input
                id="descricao"
                type="text"
                placeholder="Digite a sua descrição da imagem"
                value={state.descricao}
                onChange={(e) => handleChange(e, "descricao")}
                required
              />
            </div>
            <div>
              <label
                className="AddGaleriaModal__text Imagem-label"
                htmlFor="imagem">
                {!state.imagem.length ? "Selecione uma imagem" : state.imagem}
              </label>
              <input
                className="AddGaleriaModal__imagem"
                id="imagem"
                type="file"
                accept="imagem/png, imagem/jpg, imagem/jpeg, imagem/gif, imagem/svg"
                value={state.imagem}
                onChange={(e) => handleChange(e, "imagem")}
                required
              />
            </div>
            <button className="AddGaleriaModal__enviar" 
            disabled={canDisable} 
            type="button"
            onClick={createGaleria}>
                Enviar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddGaleriaModal;
