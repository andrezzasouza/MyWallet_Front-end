import styled from "styled-components";

export default function Balance ({ balance }) {

  var currencyConfig = {
    style: "decimal",
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    currency: "BRL",
  };

  const formatBalance = (balance / 100).toLocaleString("pt-BR", currencyConfig);
  let valueType = balance > 0;

  return (
    <BalanceContainer type={valueType}>
      <p>SALDO</p>
      <p>{balance ? formatBalance : '0,00'}</p>
    </BalanceContainer>
  );
}

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 17px;
  line-height: 20px;
  margin: 10px 0 0;
  color: ${(props) => (props.type ? "#03AC00" : "#C70000")};

  p:first-child {
    font-weight: bold;
    color: #000000;
    text-align: left;
  }

  p:last-child {
    text-align: right;
  }
  // should this be a footer?
`;