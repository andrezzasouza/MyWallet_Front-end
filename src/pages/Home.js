import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import API from '../services/api/api'

import PopModal from '../components/Modal';
import Header from '../components/Header';
import LowerButton from '../components/LowerButton';
import DataContainer from '../components/DataContainer';
import UserContext from '../contexts/UserContext';

export default function Home () {

  const history = useHistory();
  const { userData } = useContext(UserContext);
  const username = (userData.name)?.split(" ")[0];
  const [ entries, setEntries ] = useState();
    const [showModal, setShowModal] = useState(false);
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");
    const [buttons, setButtons] = useState(1);
    const [redirect, setRedirect] = useState(false);

  const jsonToken = JSON.parse(localStorage.getItem("loginData"));

  if (!localStorage.getItem("loginData")) {
    history.push("/");
  }

  useEffect(() => {
    const token = `Bearer ${jsonToken?.token}`;
    const promise = API.get("/home", {
      headers: { Authorization: token }
    });
    promise.then((res) => {
      setEntries(res.data);
    })
    .catch((res) => {
      let error = res.response.status;
      if (error === 401) {
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
    })
  }, [userData]);

  return (
    <>
      <Header
        margin="22px"
        hasLogOutIcon={true}
        pageTitle={`Olá, ${username ? username : "Fulano"}`}
      />
      <DataContainer entries={entries} />
      <ButtonHolder>
        <Link to="/income">
          <LowerButton iconType="plus" buttonText="Nova entrada" />
        </Link>
        <Link to="/expense">
          <LowerButton iconType="minus" buttonText="Nova saída" />
        </Link>
      </ButtonHolder>
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
    </>
  );
}

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`