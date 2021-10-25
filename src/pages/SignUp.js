import {Input} from "../assets/SharedStyles/Input";
import LongerButton from "../components/LongButton";
import PopModal from "../components/Modal";
import Logo from "../components/Logo";

import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp () {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

    const promise = axios.post('http://localhost:4000/sign-up', body);

    promise.then(() => {
      setShowModal(true);
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    })
    .catch((res) => {
      let error = res.response.status;
      console.log(res.response);
      if(error === 400) {
        alert("Dados inválidos. Verifique-os e tente novamente.");
      } else if (error === 409) {
        alert("Você já tem uma conta. Clique no link abaixo para fazer seu login.");
      } else if (error === 500) {
        alert("Não foi possível acessar a base de dados. Tente novamente.");
      } else {
        alert("Algo deu errado. Tente novamente.");
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
            header={"Sua jornada começou!"}
            message={"Conta criada com sucesso! Agora é so fazer o login!"}
            buttons={1}
            showModal={showModal}
            setShowModal={setShowModal}
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