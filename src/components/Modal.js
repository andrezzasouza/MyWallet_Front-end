import { useRef, useEffect, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Modal,
  ModalBackground,
  ModalButtons,
  TopSection
} from '../assets/SharedStyles/Modal';
import UserContext from '../contexts/UserContext';

export default function PopModal({
  message,
  header,
  buttons,
  showModal,
  setShowModal,
  redirect
}) {
  const history = useHistory();
  const modalRef = useRef();
  const { setUserData } = useContext(UserContext);

  function clearStorage() {
    window.localStorage.removeItem('loginData');
  }

  function toRedirect() {
    if (header.includes('Sair')) {
      clearStorage();
      setUserData('');
    }
    if (header.includes('Voltar')) {
      history.push('/home');
      return;
    }
    if (redirect) {
      history.push('/');
    }
  }

  function cancelAction() {
    setShowModal(false);
  }

  function closeModal(e) {
    if (
      buttons === 1 ||
      (header.includes('Voltar') && e?.target.className === 'second') ||
      (header.includes('Sair') && e?.target.className === 'second')
    ) {
      toRedirect();
    }
    cancelAction();
  }

  const modalKeyEvents = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal === true) {
        setShowModal(false);
        if (buttons === 1) {
          toRedirect();
        }
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', modalKeyEvents);
    return function cleanupListener() {
      window.removeEventListener('keydown', modalKeyEvents);
    };
  }, [modalKeyEvents]);

  return (
    <>
      <ModalBackground ref={modalRef} onClick={(e) => closeModal(e)} />
      <Modal>
        <TopSection>
          <h2>{header}</h2>
        </TopSection>
        <h3>{message}</h3>
        {buttons === 1 ? (
          <ModalButtons>
            <button
              type="button"
              className="second"
              onClick={(e) => closeModal(e)}
            >
              Ok!
            </button>
          </ModalButtons>
        ) : (
          <ModalButtons>
            <button type="button" onClick={() => cancelAction()}>
              Cancelar!
            </button>
            <button
              type="button"
              className="second"
              onClick={(e) => closeModal(e)}
            >
              Sim!
            </button>
          </ModalButtons>
        )}
      </Modal>
    </>
  );
}
