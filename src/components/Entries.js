import styled from "styled-components";
import dayjs from "dayjs";

export default function Entries ({ date, description, value, type}) {

  var currencyConfig = {
    style: "decimal",
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    currency: "BRL",
  };

  let displayValue = (value / 100).toLocaleString("pt-BR", currencyConfig);

  return (
    <EntriesContainer>
      <Description>
        <p>{dayjs(date).format("DD/MM")}</p>
        <p>{description}</p>
      </Description>
      <Price type={type}>
        {displayValue}
      </Price>
    </EntriesContainer>
  );
}

const EntriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 18.2px 0;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: left;
  display: flex;

  p:first-child {
    color: #c6c6c6;
    width: 48px;
  }

  p:last-child {
    margin: 0 0 0 4px;
    word-break: break-all;
    padding: 0 5px 0 0;
  }
`;

const Price = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
`;