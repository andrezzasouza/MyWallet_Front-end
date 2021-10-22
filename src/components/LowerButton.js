import styled from "styled-components";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

export default function LowerButton ({ iconType, buttonText }) {

  return (
    <Lower>
      {iconType === "plus" ? <Plus /> : <Minus />}
      <p>{buttonText}</p>
    </Lower>
  );
}

const Lower = styled.button`
  font-family: "Raleway", sans-serif;
  height: 114px;
  width: 155px;
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
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    width: 46.37%;
    text-align: left;
  }
`;

const Plus = styled(FiPlusCircle)`
  color: #ffffff;
  font-size: 26.25px;
`

const Minus = styled(FiMinusCircle)`
  color: #ffffff;
  font-size: 26.25px;
`