import styled from "styled-components"

export default function Entries ({ name, price, date}) {
  return (
    <EntriesContainer>
      <Description>
        <p>30/11</p>
        <p>Almoço mãe</p>
      </Description>
      <Price type="expense">39,90</Price>
    </EntriesContainer>
  );
}

const EntriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 16px 0;
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
  }
`;

const Price = styled.div`
  font-size: 16px;
  line-height: 19px;
  text-align: right;
  color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
`;