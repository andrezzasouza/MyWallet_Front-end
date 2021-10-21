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
    setEnabled(false);
    e.preventDefault();
    // validate if passwords are the same?
    // axios route
    // if success
    history.push("/");
    // else
    // error alert
    setEnabled(true);
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
          required
        />
        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          clickable={enabled}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          clickable={enabled}
          required
        />
        <Input
          placeholder="Confirme a senha"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          clickable={enabled}
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
      <Link to="/">
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