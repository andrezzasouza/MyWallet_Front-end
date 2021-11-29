import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../services/api/api';

import {
  IncomeExpenseForm,
  IncomeExpenseMoneyInput
} from '../assets/styles/PageStyles';
import PopModal from '../components/Modal';
import { Input } from '../assets/styles/Input';
import LongerButton from '../components/LongButton';
import Header from '../components/Header';
import { entryErr } from '../assets/helpers/StatusMessages';
import { failureConfig, prepareBody } from '../assets/helpers/SharedFunctions';

export default function Expense() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(true);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [buttons, setButtons] = useState(1);
  const [redirect, setRedirect] = useState(false);

  if (!localStorage.getItem('loginData')) {
    history.push('/');
  }

  const jsonToken = JSON.parse(localStorage.getItem('loginData'));

  function addExpense(e) {
    setEnabled(false);
    e.preventDefault();

    const token = `Bearer ${jsonToken?.token}`;
    const promise = API.post(
      '/entry',
      prepareBody(value, description, 'expense'),
      {
        headers: { Authorization: token }
      }
    );

    promise
      .then(() => {
        history.push('/home');
      })
      .catch((err) => {
        failureConfig(setHeader, setButtons, setRedirect, setShowModal);
        if (entryErr(err)) {
          setMessage(entryErr(err));
        } else {
          setMessage('Algo deu errado. Tente novamente.');
        }
        setEnabled(true);
      });
  }

  return (
    <>
      <Header
        pageTitle="Nova saída"
        hasLogOutIcon={false}
        margin="40px"
        value={value}
        description={description}
      />
      <IncomeExpenseForm onSubmit={(e) => addExpense(e)}>
        <IncomeExpenseMoneyInput
          placeholder="Valor"
          thousandSeparator={false}
          prefix="R$ "
          allowNegative={false}
          decimalScale={2}
          fixedDecimalScale
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
          type="submit"
          margin="36px"
          enabled={enabled}
          clickable={enabled}
          text="Salvar saída"
        />
      </IncomeExpenseForm>
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
