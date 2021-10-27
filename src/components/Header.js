import styled from 'styled-components';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { VscSignOut } from "react-icons/vsc";

import PopModal from './Modal';
// import Exit from "./Exit";

export default function Header ({pageTitle, hasLogOutIcon, margin}) {

  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  function logOut() {
    setHeader("Sair");
    setMessage("Você realmente deseja sair da sua conta?");
    setButtons(2);
    setRedirect(true);
    setShowModal(true);
  }

  function goBack() {
    setHeader("Voltar");
    setMessage("Você realmente deseja abandonar esse registro e voltar pra home?");
    setButtons(2);
    setRedirect(true);
    setShowModal(true);
  }

  return (
    <AppHeader margin={margin}>
      <h1>{pageTitle}</h1>
      {hasLogOutIcon ? (
        <Exit
          onClick={logOut}
        />
      ) : (
        <Back onClick={goBack} />
      )}
      {showModal ? (
        <>
          <PopModal
            header={header}
            message={message}
            buttons={buttons}
            showModal={showModal}
            setShowModal={setShowModal}
            redirect={redirect}
          />
        </>
      ) : (
        ""
      )}
    </AppHeader>
  );
}

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.margin};

  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
    max-width: calc(100% - 35px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Back = styled(TiArrowBackOutline)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;

const Exit = styled(VscSignOut)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;