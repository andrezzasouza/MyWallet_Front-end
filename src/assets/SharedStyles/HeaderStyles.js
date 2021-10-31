import styled from "styled-components";

import { TiArrowBackOutline } from "react-icons/ti";
import { VscSignOut } from "react-icons/vsc";

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
    max-width: calc(100% - 35px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Back = styled(TiArrowBackOutline)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;

const Exit = styled(VscSignOut)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;

export { AppHeader, Back, Exit };
