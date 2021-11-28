import dayjs from 'dayjs';
import {
  EntriesContainer,
  Description,
  Price
} from '../assets/styles/EntriesStyles';

export default function Entries({ date, description, value, type }) {
  const currencyConfig = {
    style: 'decimal',
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    currency: 'BRL'
  };

  const displayValue = (value / 100).toLocaleString('pt-BR', currencyConfig);

  return (
    <EntriesContainer>
      <Description>
        <p>{dayjs(date).format('DD/MM')}</p>
        <p>{description}</p>
      </Description>
      <Price type={type}>{displayValue}</Price>
    </EntriesContainer>
  );
}
