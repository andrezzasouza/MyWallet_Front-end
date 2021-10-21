import { useState } from 'react';
import { Input } from '../assets/SharedStyles/Input';
import { LongButton } from '../assets/SharedStyles/LongButton';
import Header from '../components/Header';
import Loader from 'react-loader-spinner';
import axios from 'axios';

export default function Income () {

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(true);

  function addIncome (e) {
    setEnabled(false);
    e.preventDefault();
    // axios
    // if success
    // add data to database and home
    // else
    // error message
    setEnabled(true);
  }

  return (
    <>
      <Header 
        pageTitle="Nova entrada"
        hasIcon={false}
        margin="40px"
       />
      <form onSubmit={addIncome}>
        <Input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clickable={enabled}
          required
        />
        <Input
          placeholder="Descrição"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          clickable={enabled}
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