import styled from "styled-components";

const AppName = styled.h1`
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  margin-bottom: ${(props) => props.margin};

  @media (min-width: 801px) {
    font-size: 60px;
    line-height: 70px;
    margin-bottom: 40px;
  }
`;

export {
  AppName,
}