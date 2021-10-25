import { Modal, ModalBackground, ModalButtons, TopSection } from "../assets/SharedStyles/Modal";
import { useHistory } from "react-router-dom";
import { useRef, useEffect, useCallback } from "react";

export default function PopModal ({ message, header, buttons, showModal, setShowModal, redirect }) {

  const history = useHistory();
  const modalRef = useRef();

  function toRedirect() {
    if (redirect) {
      history.push("/");
    }
  }

  function closeModal(e) {
    if (modalRef.current === e.target) {
      setShowModal(false);
    } else {
      setShowModal(false);
    } 
    toRedirect();
  }

  const modalKeyEvents = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal === true) {
        setShowModal(false);
        toRedirect();
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", modalKeyEvents);
    return function cleanupListener() {
      window.removeEventListener("keydown", modalKeyEvents);
    };
  }, [modalKeyEvents]);

  return (
    <>
      <ModalBackground ref={modalRef} onClick={closeModal}></ModalBackground>
      <Modal>
        <TopSection>
          <h2>{header}</h2>
        </TopSection>
        <h3>{message}</h3>
        {buttons === 1 ? (
          <ModalButtons>
            <button className="second" onClick={closeModal}>
              Ok!
            </button>
          </ModalButtons>
        ) : (
          <>
            <ModalButtons>
              <button onClick={closeModal}>
                Cancelar!
              </button>
            </ModalButtons>
            <ModalButtons>
            <button className="second" onClick={closeModal}>
              Sim!
            </button>
          </ModalButtons>
        </>
        )}
      </Modal>
    </>
  );
}