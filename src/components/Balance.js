import { BalanceContainer } from '../assets/SharedStyles/BalanceStyle';

export default function Balance({ balance }) {
  const currencyConfig = {
    style: 'decimal',
    useGrouping: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
    currency: 'BRL'
  };

  const formatBalance = (balance / 100).toLocaleString('pt-BR', currencyConfig);
  const positive = balance > 0;

  return (
    <BalanceContainer positive={positive}>
      <p>SALDO</p>
      <p>{balance ? formatBalance : '0,00'}</p>
    </BalanceContainer>
  );
}
