import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/api/api';

import {
  LoginSignupRedirectText,
  LoginSignupPageHolder
} from '../assets/styles/PageStyles';
import { Input } from '../assets/styles/Input';
import LongerButton from '../components/LongButton';
import { signUpErr } from '../assets/misc/StatusMessages';
import { failureConfig } from '../assets/misc/SharedFunctions';
import PopModal from '../components/Modal';
import Logo from '../components/Logo';

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  if (localStorage.getItem('loginData')) {
    history.push('/home');
  }

  function prepareBody() {
    const body = {
      name,
      email,
      password,
      repeatPassword
    };
    return body;
  }

  function successConfig() {
    setHeader('Sua jornada começou!');
    setMessage('Conta criada com sucesso! Agora é so fazer o login!');
    setButtons(1);
    setShowModal(true);
    setRedirect(true);
  }

  function clearInputs() {
    setName('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  }

  function axiosSignUp() {
    const promise = API.post('/sign-up', prepareBody());
    promise
      .then(() => {
        successConfig();
        clearInputs();
      })
      .catch((err) => {
        failureConfig(setHeader, setButtons, setRedirect, setShowModal);
        if (err.response.status === 409) {
          setRedirect(true);
        }
        if (signUpErr(err)) {
          setMessage(signUpErr(err));
        } else {
          setMessage('Algo deu errado. Tente novamente.');
        }
        setEnabled(true);
      });
  }

  function logIntoAccount(e) {
    e.preventDefault();
    setEnabled(false);
    axiosSignUp();
  }

  return (
    <LoginSignupPageHolder>
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
          type="submit"
          margin="32px"
          enabled={enabled}
          clickable={enabled}
          text="Cadastrar"
        />
      </form>
      <Link to={enabled ? '/' : '/sign-up'}>
        <LoginSignupRedirectText>
          Já tem uma conta? Entre agora!
        </LoginSignupRedirectText>
      </Link>
      {showModal ? (
        <PopModal
          header={header}
          message={message}
          buttons={buttons}
          showModal={showModal}
          setShowModal={setShowModal}
          redirect={redirect}
        />
      ) : (
        ''
      )}
    </LoginSignupPageHolder>
  );
}
