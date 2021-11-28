import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/api/api';

import { RedirectText, PageHolder } from '../assets/styles/PageStyles';
import { Input } from '../assets/styles/Input';
import LongerButton from '../components/LongButton';
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

  function logIntoAccount(e) {
    e.preventDefault();
    setEnabled(false);

    const body = {
      name,
      email,
      password,
      repeatPassword
    };

    const promise = API.post('/sign-up', body);

    promise
      .then(() => {
        setHeader('Sua jornada começou!');
        setMessage('Conta criada com sucesso! Agora é so fazer o login!');
        setButtons(1);
        setShowModal(true);
        setRedirect(true);
        setName('');
        setEmail('');
        setPassword('');
        setRepeatPassword('');
      })
      .catch((res) => {
        const error = res.response.status;

        const serverMessage = res.response?.data.message;
        let displayMessage = 'Dados inválidos.';

        if (serverMessage?.includes('email')) {
          displayMessage = 'E-mail inválido.';
        } else if (serverMessage?.includes('repeatPassword')) {
          displayMessage = 'A confirmação da senha deve ser igual à senha.';
        } else if (serverMessage?.includes('password')) {
          displayMessage = 'A senha deve ter pelo menos 6 caracteres.';
        } else if (serverMessage?.includes('name')) {
          displayMessage = 'O nome deve conter pelo menos 2 letras.';
        }

        if (error === 400) {
          setHeader('Algo deu errado!');
          setMessage(`${displayMessage} Verifique e tente novamente.`);
          setButtons(1);
          setRedirect(false);
          setShowModal(true);
        } else if (error === 409) {
          setHeader('Algo deu errado!');
          setMessage(
            'Você já tem uma conta. Clique no botão abaixo para fazer seu login.'
          );
          setButtons(1);
          setRedirect(true);
          setShowModal(true);
        } else if (error === 500) {
          setHeader('Algo deu errado!');
          setMessage(
            'Não foi possível acessar a base de dados. Tente novamente.'
          );
          setButtons(1);
          setRedirect(false);
          setShowModal(true);
        } else {
          setHeader('Algo deu errado!');
          setMessage('Algo deu errado. Tente novamente.');
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
          type="submit"
          margin="32px"
          enabled={enabled}
          clickable={enabled}
          text="Cadastrar"
        />
      </form>
      <Link to={enabled ? '/' : '/sign-up'}>
        <RedirectText>Já tem uma conta? Entre agora!</RedirectText>
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
    </PageHolder>
  );
}
