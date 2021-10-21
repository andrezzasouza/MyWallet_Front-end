import styled from "styled-components";

const LongButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #FFFFFF;
  background-color: #A328D6;
  margin-bottom: ${(props) => props.margin};
`;

export {LongButton}