import { useState } from "react";
import { useHistory } from "react-router-dom";

import { AppHeader, Back, Exit } from "../assets/SharedStyles/HeaderStyles";
import PopModal from "./Modal";

export default function Header({
  pageTitle,
  hasLogOutIcon,
  margin,
  value,
  description,
}) {
  const history = useHistory();
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
    if (!value && !description) {
      history.push("/home");
      return;
    }
    setHeader("Voltar");
    setMessage(
      "Você realmente deseja abandonar esse registro e voltar pra home?"
    );
    setButtons(2);
    setRedirect(true);
    setShowModal(true);
  }

  return (
    <AppHeader margin={margin}>
      <h1>{pageTitle}</h1>
      {hasLogOutIcon ? <Exit onClick={logOut} /> : <Back onClick={goBack} />}
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