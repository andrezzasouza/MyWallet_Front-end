import {Input} from "../assets/SharedStyles/Input";
import LongerButton from "../components/LongButton";
import PopModal from "../components/Modal";
import Logo from "../components/Logo";

import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import API from "../services/api/api";

export default function SignUp () {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  if (localStorage.getItem("loginData")) {
    history.push("/home");
  }

  function logIntoAccount (e) {
    e.preventDefault();
    setEnabled(false);
  
    const body = {
      name,
      email,
      password,
      repeatPassword
    }

    const promise = API.post("/sign-up", body);

    promise.then(() => {
      setHeader("Sua jornada começou!");
      setMessage("Conta criada com sucesso! Agora é so fazer o login!");
      setButtons(1);
      setShowModal(true);
      setRedirect(true);
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    })
    .catch((res) => {
      let error = res.response.status;

      let serverMessage = res.response?.data.message;
      let displayMessage = "Dados inválidos.";

      if (serverMessage.includes("email")) {
        displayMessage = "E-mail inválido.";
      } else if (serverMessage.includes("repeatPassword")) {
        displayMessage = "A confirmação da senha deve ser igual à senha.";
      } else if (serverMessage.includes("password")) {
        displayMessage = "A senha deve ter pelo menos 6 caracteres.";
      } else if (serverMessage.includes("name")) {
        displayMessage = "O nome deve conter pelo menos 2 letras.";
      } 

      if(error === 400) {
        setHeader("Algo deu errado!");
        setMessage(`${displayMessage} Verifique e tente novamente.`);
        setButtons(1);
        setRedirect(false);
        setShowModal(true);
      } else if (error === 409) {
        setHeader("Algo deu errado!");
        setMessage("Você já tem uma conta. Clique no link abaixo para fazer seu login.");
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
    });
  }

  return (
    <PageHolder>
      <Logo margin="28px" />
      <form onSubmit={logIntoAccount}>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
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
        <Input
          placeholder="Confirme a senha"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <LongerButton
          type={"submit"}
          margin={"32px"}
          enabled={enabled}
          clickable={enabled}
          text={"Cadastrar"}
        />
      </form>
      <Link to={enabled ? "/" : "/sign-up"}>
        <RedirectText>Já tem uma conta? Entre agora!</RedirectText>
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

  form {
    max-width: 540px;
    margin: 0 auto;
  }
`;