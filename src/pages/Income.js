import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

import { Input } from '../assets/SharedStyles/Input';
import { LongButton } from '../assets/SharedStyles/LongButton';
import Header from '../components/Header';
import UserContext from "../contexts/UserContext";
import Loader from 'react-loader-spinner';


export default function Income () {

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (!userData.token) {
      history.push("/");
    }
  }, [userData, history]);

  function addIncome (e) {
    setEnabled(false);
    e.preventDefault();

    const body = {
      description,
      value,
      type: "income"
    }
    const token = `Bearer ${userData.token}`;
    const promise = axios.post("http://localhost:4000/income", body, {
      headers: { Authorization: token },
    });
      
    promise.then(() => {
      history.push("/home");
    })
    .catch((res) => {
      if (res.response.status === 400) {
        alert("Dados inválidos. Verifique-os e tente novamente.");
      } else if (res.response.status === 401) {
        // there are 2 cases here
      } else if (res.response.status === 500) {
        alert("Não foi possível pegar os dados da sua conta. Tente novamente.");
      } else {
        alert("Algo deu errado. Tente novamente.");
      }
      setEnabled(true);
    });
  }

  return (
    <>
      <Header pageTitle="Nova entrada" hasLogOutIcon={false} margin="40px" />
      <form onSubmit={addIncome}>
        <Input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <Input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        />
        <LongButton type="submit" margin="36px" clickable={enabled}>
          {enabled ? (
            "Salvar entrada"
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
    </>
  );
}