import {Input} from "../assets/SharedStyles/Input";
import LongerButton from "../components/LongButton";
import Logo from "../components/Logo";
import UserContext from "../contexts/UserContext";
import PopModal from "../components/Modal";

import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import API from "../services/api/api";

export default function Login () {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(true);
  const { setUserData } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  if (localStorage.getItem("loginData")) {
    history.push("/home");
  }

  function logIntoAccount (e) {
    setEnabled(false);
    e.preventDefault();

    const body = {
      email,
      password
    }

    const promise = API.post("/login", body);

    promise.then((res) => {
      setEmail("");
      setPassword("");
      setUserData(res.data);
      localStorage.setItem("loginData", JSON.stringify(res.data));
      history.push("/home");
    })
    .catch((res) => {
      let error = res.response.status;

      let serverMessage = res.response?.data.message;
      let displayMessage = "Dados inválidos.";

      if (serverMessage.includes("email")) {
        displayMessage = "E-mail inválido.";
      } else if (serverMessage.includes("password")) {
        displayMessage = "A senha deve ter pelo menos 6 caracteres.";
      }

      if (error === 400) {
        setHeader("Algo deu errado!");
        setMessage(`${displayMessage} Verifique e tente novamente.`);
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      } else if (error === 404) {
        setHeader("Algo deu errado!");
        setMessage("Você ainda não tem uma conta com esse e-mail. Clique no link abaixo para fazer seu cadastro ou entre com outro e-mail.");
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      } else if (error === 401) {
        setHeader("Algo deu errado!");
        setMessage("Combinação email e senha incorreta. Verifique os dados e tente novamente.");
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      } else if (error === 500) {
        setHeader("Algo deu errado!");
        setMessage("Não foi possível acessar a base de dados. Tente novamente.");
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      } else {
        setHeader("Algo deu errado!");
        setMessage("Algo deu errado. Tente novamente.");
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      }
      setEnabled(true);
    })
  }

  return (
    <PageHolder>
      <Logo margin="24px" />
      <form onSubmit={logIntoAccount}>
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value?.toLowerCase())}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <LongerButton
          type={"submit"}
          margin={"36px"}
          enabled={enabled}
          clickable={enabled}
          text="Entrar"
        />
      </form>
      <Link to={enabled ? "/sign-up" : "/"}>
        <RedirectText>Primeira vez? Cadastre-se!</RedirectText>
      </Link>
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
    </PageHolder>
  );
}

const RedirectText = styled.p`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
`;

const PageHolder = styled.div`
  width: 100%;
  height: calc(100vh - 25px - 16px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;