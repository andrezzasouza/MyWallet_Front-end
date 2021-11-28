import styled from 'styled-components';

const Input = styled.input`
  font-family: 'Raleway', sans-serif;
  width: 100%;
  height: 58px;
  border: none;
  border-radius: 5px;
  padding: 18px 15px 17px;
  font-size: 20px;
  line-height: 23px;
  margin: 0 0 13px;
  background-color: ${(props) => (props.clickable ? '#FFFFFF' : '#d4d2d2')};
  pointer-events: ${(props) => (props.clickable ? 'auto' : 'none')};

  &::placeholder {
    color: #000000;
  }
`;

export { Input };
