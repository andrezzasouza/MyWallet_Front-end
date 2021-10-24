import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';

import Exit from "./Exit";

export default function Header ({pageTitle, hasLogOutIcon, margin}) {
  return (
    <AppHeader margin={margin}>
      <h1>{pageTitle}</h1>
      {hasLogOutIcon ? (
        <Exit />
      ) : (
        <Link to="/home">
          <Back />
        </Link>
      )}
    </AppHeader>
  );
}

// turn Back into a component to add functions to it?

const AppHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.margin};
  
  h1 {
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #ffffff;
  }
`;

const Back = styled(TiArrowBackOutline)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;