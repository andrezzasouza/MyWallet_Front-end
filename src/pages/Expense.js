import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from "styled-components";

import { Input } from '../assets/SharedStyles/Input';
import { LongButton } from "../assets/SharedStyles/LongButton";
import Header from "../components/Header";

import Loader from "react-loader-spinner";
import NumberFormat from "react-number-format";

export default function Expense () {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();
  const { userData } = useContext(UserContext);

  if (!localStorage.getItem("loginData")) {
    history.push("/");
  }

  function addExpense(e) {
    setEnabled(false);
    e.preventDefault();

    const formatValue = Number(value?.replace("R$ ", "").replace(",", ""));

    const body = {
      description,
      value: formatValue,
      type: "expense",
    };

    const token = `Bearer ${userData?.token}`;
    const promise = axios.post("http://localhost:4000/entry", body, {
      headers: { Authorization: token },
    });

    promise
      .then(() => {
        history.push("/home");
      })
      .catch((res) => {
        let error = res.response.status;
        if (error === 400) {
          alert("Dados inválidos. Verifique-os e tente novamente.");
        } else if (error === 401) {
          // there are 2 cases here
        } else if (error === 500) {
          alert(
            "Não foi possível acessar a base de dados. Tente novamente."
          );
        } else {
          alert("Algo deu errado. Tente novamente.");
        }
        setEnabled(true);
      });
  }

  return (
    <>
      <Header pageTitle="Nova saída" hasLogOutIcon={false} margin="40px" />
      <form onSubmit={addExpense}>
        {/* <Input
          step="0.01"
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clickable={enabled}
          disabled={!enabled}
          required
        /> */}
        <MoneyInput
          placeholder="Valor"
          thousandSeparator={false}
          prefix={"R$ "}
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale={true}
          decimalSeparator=","
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
            "Salvar saída"
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

const MoneyInput = styled(NumberFormat)`
  font-family: "Raleway", sans-serif;
  width: 100%;
  height: 58px;
  border: none;
  border-radius: 5px;
  padding: 18px 15px 17px;
  font-size: 20px;
  line-height: 23px;
  margin: 0 0 13px;
  background-color: ${(props) => (props.clickable ? "#FFFFFF" : "#d4d2d2")};
  pointer-events: ${(props) => (props.clickable ? "auto" : "none")};

  &::placeholder {
    color: #000000;
  }
`;