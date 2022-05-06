import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AddGaleriaModal.css";
import { GaleriaService } from "services/GaleriaService.js";
import { ActionMode } from "constants/index.js";

const AddGaleriaModal = ({ closeModal, onCreateGaleria, mode, onUpdateGaleria, galeriaToUpdate }) => {
  const form = {
    titulo: galeriaToUpdate?.titulo ?? '',
    tema: galeriaToUpdate?.tema ?? '',
    imagem: galeriaToUpdate?.imagem ?? '',
    ano: galeriaToUpdate?.ano ?? '',
    descricao: galeriaToUpdate?.descricao ?? '',
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.descricao.length &&
        state.imagem.length &&
        String(state.ano).length &&
        state.tema.length &&
        state.titulo.length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSend = async () => {
    const renamePathImages = (imagePath) => imagePath.split(/\\|\//).pop();

    const { titulo, tema, imagem, ano, descricao } = state;

    const galeria = {
      ...(galeriaToUpdate && {_id: galeriaToUpdate?.id}),
      titulo: titulo,
      tema,
      ano,
      descricao,
      imagem: `assets/image/${renamePathImages(imagem)}`,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => GaleriaService.create(galeria),
      [ActionMode.ATUALIZAR]: () => GaleriaService.updateById(galeriaToUpdate?.id, galeria),
    }

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateGaleria(response),
      [ActionMode.ATUALIZAR]: () => onUpdateGaleria(response),
    }

    actionResponse[mode]();

    const reset = {
      titulo: '',
      tema: '',
      imagem: '',
      ano: '',
      descricao: '',
    }

    setState(reset);
    
    closeModal();
    window.location.reload();
  };

  return (
    <>
      <Modal closeModal={closeModal}>
        <div className="AddGaleriaModal">
          <form autoComplete="off">
            <h2>{ActionMode.ATUALIZAR === mode ? 'Atualizar Card' : 'Adicionar Card'}</h2>
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
                htmlFor="imagem"
              >
                {!state.imagem.length ? "Selecione uma imagem" : state.imagem}
              </label>
              <input
                className="AddGaleriaModal__imagem"
                id="imagem"
                type="file"
                accept="imagem/png, imagem/jpg, imagem/jpeg, imagem/gif, imagem/svg"
                onChange={(e) => handleChange(e, "imagem")}
                required
              />
            </div>
            <button
              className="AddGaleriaModal__enviar"
              disabled={canDisable}
              type="button"
              onClick={handleSend}
            >
              {ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar'}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddGaleriaModal;
