import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

import { VscSignOut } from "react-icons/vsc";
import UserContext from "../contexts/UserContext";

export default function Exit () {

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  function clearStorage() {
    window.localStorage.removeItem("loginData");
  }

  function logOut () {
    clearStorage();
    setUserData("");
    history.push("/");
  }

  return(
    <ExitButton onClick={logOut} />
  );
}

const ExitButton = styled(VscSignOut)`
  font-size: 28.55px;
  color: #ffffff;
  cursor: pointer;
`;