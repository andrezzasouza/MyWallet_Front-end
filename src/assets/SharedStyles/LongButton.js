import styled from "styled-components";

const LongButton = styled.button`
  font-family: "Raleway", sans-serif;
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
  color: #ffffff;
  background-color: #a328d6;
  margin-bottom: ${(props) => props.margin};
  pointer-events: ${(props) => (props.clickable ? "auto" : "none")};
  opacity: ${(props) => (props.clickable ? 1 : 0.7)};
`;

export {LongButton}