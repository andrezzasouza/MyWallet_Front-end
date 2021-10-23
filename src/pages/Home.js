import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import LowerButton from '../components/LowerButton';
import DataContainer from '../components/DataContainer';

export default function Home () {

  const username = "";
  return (
    <>
      <Header
        margin="22px"
        hasLogOutIcon={true}
        pageTitle={`Olá, ${username ? username : "Fulano"}`}
      />
      <DataContainer />
      <ButtonHolder>
        <Link to="/income">
          <LowerButton 
            iconType="plus" 
            buttonText="Nova entrada" 
          />
        </Link>
        <Link to="/expense">
          <LowerButton 
            iconType="minus" 
            buttonText="Nova saída" 
          />
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