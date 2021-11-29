import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../services/api/api';

import { HomeButtonHolder } from '../assets/styles/PageStyles';
import PopModal from '../components/Modal';
import Header from '../components/Header';
import LowerButton from '../components/LowerButton';
import DataContainer from '../components/DataContainer';
import UserContext from '../contexts/UserContext';
import { homeErr } from '../assets/misc/StatusMessages';
import { failureConfig } from '../assets/misc/SharedFunctions';

export default function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const username = userData.name?.split(' ')[0];
  const [entries, setEntries] = useState();
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const jsonToken = JSON.parse(localStorage.getItem('loginData'));

  if (!localStorage.getItem('loginData')) {
    history.push('/');
  }

  useEffect(() => {
    const token = `Bearer ${jsonToken?.token}`;
    const promise = API.get('/home', {
      headers: { Authorization: token }
    });
    promise
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => {
        failureConfig(setHeader, setButtons, setRedirect, setShowModal);
        if (homeErr(err)) {
          setMessage(homeErr(err));
        } else {
          setMessage('Algo deu errado. Tente novamente.');
        }
      });
  }, [userData]);

  return (
    <>
      <Header
        margin="22px"
        hasLogOutIcon
        pageTitle={`Olá, ${username ? username : 'Fulano'}`}
      />
      <DataContainer entries={entries} />
      <HomeButtonHolder>
        <Link to="/income">
          <LowerButton iconType="plus" buttonText="Nova entrada" />
        </Link>
        <Link to="/expense">
          <LowerButton iconType="minus" buttonText="Nova saída" />
        </Link>
      </HomeButtonHolder>
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
    </>
  );
}
