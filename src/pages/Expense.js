import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import API from "../services/api/api";

import { Input } from '../assets/SharedStyles/Input';
import LongerButton from '../components/LongButton';
import Header from "../components/Header";

import NumberFormat from "react-number-format";

export default function Expense () {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();

  if (!localStorage.getItem("loginData")) {
    history.push("/");
  }

  const jsonToken = JSON.parse(localStorage.getItem("loginData"));

  function addExpense(e) {
    setEnabled(false);
    e.preventDefault();

    const formatValue = Number(value?.replace("R$ ", "").replace(",", ""));

    const body = {
      description,
      value: formatValue,
      type: "expense",
    };

    const token = `Bearer ${jsonToken?.token}`;
    const promise = API.post("/entry", body, {
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
          alert("Acesso negado. Tente novamente.");
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
        <LongerButton
          type={"submit"}
          margin={"36px"}
          enabled={enabled}
          clickable={enabled}
          text={"Salvar saída"}
        />
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