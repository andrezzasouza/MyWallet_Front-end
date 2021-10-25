import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import LowerButton from '../components/LowerButton';
import DataContainer from '../components/DataContainer';
import UserContext from '../contexts/UserContext';

export default function Home () {

  const history = useHistory();
  const { userData } = useContext(UserContext);
  const username = (userData.name)?.split(" ")[0];
  const [ entries, setEntries ] = useState();

  if (!localStorage.getItem("loginData")) {
    history.push("/");
  }

  useEffect(() => {
    const token = `Bearer ${userData?.token}`;
    console.log(token);
    const promise = axios.get("http://localhost:4000/home", {
      headers: { Authorization: token }
    });
    console.log(token)
    promise.then((res) => {
      console.log(res);
      setEntries(res.data);
      console.log("3", entries);
    })
    .catch((res) => {
      let error = res.response.status
      if (error === 401) {
        alert("Acesso negado. Tente novamente.");
      } else if (error === 500) {
        alert("Não foi possível acessar a base de dados. Tente novamente.");
      } else {
        alert("Algo deu errado. Tente novamente.");
      }
    })
  }, [userData]);

  console.log("4", entries);

  return (
    <>
      <Header
        margin="22px"
        hasLogOutIcon={true}
        pageTitle={`Olá, ${username ? username : "Fulano"}`}
      />
      {console.log("1", entries)}
      <DataContainer entries={entries} />
      <ButtonHolder>
        <Link to="/income">
          <LowerButton iconType="plus" buttonText="Nova entrada" />
        </Link>
        <Link to="/expense">
          <LowerButton iconType="minus" buttonText="Nova saída" />
        </Link>
      </ButtonHolder>
    </>
  );
}

const ButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  // should this be a footer?
`