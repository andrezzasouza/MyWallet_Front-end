import { useState } from 'react';
import LongerButton from '../components/LongButton';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API from "../services/api/api"
import PopModal from '../components/Modal';

import { Input } from '../assets/SharedStyles/Input';
import Header from '../components/Header';
import NumberFormat from "react-number-format";


export default function Income () {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  if (!localStorage.getItem("loginData")) {
    history.push("/");
  }

  const jsonToken = JSON.parse(localStorage.getItem("loginData"));

  function addIncome(e) {
    setEnabled(false);
    e.preventDefault();

    const formatValue = Number(value?.replace("R$ ", "").replace(",", ""));

    const body = {
      description,
      value: formatValue,
      type: "income",
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

        let serverMessage = res.response?.data.message;
        let displayMessage = "Dados inválidos.";

        if (serverMessage?.includes("description")) {
          displayMessage = "A descrição deve ter pelo menos 2 caracteres.";
        } else if (serverMessage?.includes("value")) {
          displayMessage = "O valor mínimo deve ser de pelo menos R$ 0,01.";
        }

        if (error === 400) {
          setHeader("Algo deu errado!");
          setMessage(`${displayMessage} Verifique e tente novamente.`);
          setButtons(1);
          setRedirect(false);
          setShowModal(true);
        } else if (error === 401) {
          setHeader("Algo deu errado!");
          setMessage("Acesso negado. Faça seu login novamente.");
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
        setEnabled(true);
      });
  }

  return (
    <>
      <Header 
        pageTitle="Nova entrada" 
        hasLogOutIcon={false} 
        margin="40px"
        value={value}
        description={description}
      />
      <Form onSubmit={addIncome}>
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
          text={"Salvar entrada"}
        />
      </Form>
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

const Form = styled.form`
  max-width: 540px;
  margin: 0 auto;
`

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