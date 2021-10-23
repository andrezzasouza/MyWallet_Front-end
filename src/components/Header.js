import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import { TiArrowBackOutline } from 'react-icons/ti';


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

// turn Exit into a component to add functions to it? What about Back?

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

const Exit = styled(VscSignOut)`
  font-size: 28.55px;
  color: #ffffff;
`;

const Back = styled(TiArrowBackOutline)`
  font-size: 28.55px;
  color: #ffffff;
`;