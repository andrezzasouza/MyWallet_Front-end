import {Input} from "../assets/SharedStyles/Input";
import {LongButton} from "../assets/SharedStyles/LongButton";
import Logo from "../components/Logo";
import Loader from "react-loader-spinner";

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
      alert("Conta criada com sucesso. Agora é só fazer o login!")
      setName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      history.push("/");
    })
    .catch((res) => {
      console.log(res);
      if(res.response.status === 400) {
        alert("Dados inválidos. Verifique-os e tente novamente.");
        // indicar qual dado está errado?
      } else if (res.response.status === 409) {
        alert("Você já tem uma conta. Clique no link abaixo para fazer seu login.");
      } else if (res.response.status === 500) {
        alert("Não foi possível cadastrar seus dados. Tente novamente.");
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
          onChange={(e) => setEmail(e.target.value)}
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
        <LongButton type="submit" margin="32px" clickable={enabled}>
          {enabled ? (
            "Cadastrar"
          ) : (
            <Loader
              type="ThreeDots"
              color="white"
              height={50}
              width={100}
              timeout={3000}
            />
          )}
        </LongButton>
      </form>
      <Link to="">
        <RedirectText>
          Já tem uma conta? Entre agora!
        </RedirectText>
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