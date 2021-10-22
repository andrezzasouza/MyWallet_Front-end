import styled from "styled-components";
import Entries from "./Entries";
import Balance from "./Balance";

export default function DataContainer () {

  const hasEntries = true;

  return (
    <DataHolder hasEntries={hasEntries}>
      {hasEntries ? (
        <EntriesHolder>
          <div>
            <Entries />
            <Entries />
          </div>
          <Balance />
        </EntriesHolder>
      ) : (
        <NoEntries>
          <p>
            Não há registros de entrada ou saída
          </p>
        </NoEntries>
      )}
    </DataHolder>
  );
}

const DataHolder = styled.main`
  width: 100%;
  height: calc(100vh - 221px);
  border-radius: 5px;
  background: #ffffff;
  padding: 23px 11px 10px 12px;
`;

const NoEntries = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EntriesHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
