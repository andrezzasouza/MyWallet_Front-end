import styled from 'styled-components';
import NumberFormat from 'react-number-format';

const LoginSignupRedirectText = styled.p`
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
`;

const LoginSignupPageHolder = styled.div`
  width: 100%;
  height: calc(100vh - 25px - 16px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    max-width: 540px;
    margin: 0 auto;
  }
`;

const HomeButtonHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IncomeExpenseForm = styled.form`
  max-width: 540px;
  margin: 0 auto;
`;

const IncomeExpenseMoneyInput = styled(NumberFormat)`
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

export {
  LoginSignupRedirectText,
  LoginSignupPageHolder,
  HomeButtonHolder,
  IncomeExpenseForm,
  IncomeExpenseMoneyInput
};
