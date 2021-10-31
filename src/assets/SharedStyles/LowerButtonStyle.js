import styled from "styled-components";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const Lower = styled.button`
  font-family: "Raleway", sans-serif;
  height: 114px;
  width: calc(50vw - 30px);
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 9px 9px;
  background-color: #a328d6;
  margin: 13px 0 0;

  p {
    color: #ffffff;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    width: 46.37%;
    text-align: left;
  }
`;

const Plus = styled(FiPlusCircle)`
  color: #ffffff;
  font-size: 26.25px;
`;

const Minus = styled(FiMinusCircle)`
  color: #ffffff;
  font-size: 26.25px;
`;

export {
  Lower,
  Plus,
  Minus
}