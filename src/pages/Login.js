import {Input} from "../assets/SharedStyles/Input";
import LongerButton from "../components/LongButton";
import Logo from "../components/Logo";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

export default function Login () {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(true);
  const { setUserData, userData } = useContext(UserContext);

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

    const promise = axios.post('http://localhost:4000/login', body);

    promise.then((res) => {
    setEmail("");
    setPassword("");

    setUserData(res.data);
    console.log(res.data);
    localStorage.setItem("loginData", JSON.stringify(res.data));

    history.push("/home");
    // setEnabled(true) aqui também?
    })
    .catch((res) => {
      let error = res.response.status;
      if (error === 400) {
        alert("Dados inválidos. Verifique-os e tente novamente.");
      } else if (error === 404) {
        alert("Você ainda não tem uma conta com esse e-mail. Clique no link abaixo para fazer seu cadastro ou entre com outro e-mail.");
      } else if (error === 401) {
        alert("Combinação email e senha incorreta. Verifique os dados e tente novamente.")
      } else if (error === 500) {
        alert("Não foi possível acessar a base de dados. Tente novamente.");
      } else {
        alert("Algo deu errado. Tente novamente.");
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