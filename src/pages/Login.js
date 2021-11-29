import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/api/api';

import {
  LoginSignupRedirectText,
  LoginSignupPageHolder
} from '../assets/styles/PageStyles';
import { Input } from '../assets/styles/Input';
import LongerButton from '../components/LongButton';
import Logo from '../components/Logo';
import UserContext from '../contexts/UserContext';
import { loginErr } from '../assets/helpers/StatusMessages';
import { failureConfig } from '../assets/helpers/SharedFunctions';
import PopModal from '../components/Modal';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);
  const { setUserData } = useContext(UserContext);
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
      email,
      password
    };
    return body;
  }

  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  function logIntoAccount(e) {
    setEnabled(false);
    e.preventDefault();

    const promise = API.post('/login', prepareBody());
    promise
      .then((res) => {
        clearInputs();
        setUserData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
        history.push('/home');
      })
      .catch((err) => {
        failureConfig(setHeader, setButtons, setRedirect, setShowModal);
        if (loginErr(err)) {
          setMessage(loginErr(err));
        } else {
          setMessage('Algo deu errado. Tente novamente.');
        }
        setEnabled(true);
      });
  }

  return (
    <LoginSignupPageHolder>
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
          type="submit"
          margin="36px"
          enabled={enabled}
          clickable={enabled}
          text="Entrar"
        />
      </form>
      <Link to={enabled ? '/sign-up' : '/'}>
        <LoginSignupRedirectText>
          Primeira vez? Cadastre-se!
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
