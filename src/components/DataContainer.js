import { DataHolder, NoEntries, EntriesHolder, ScrollableContainer} from "../assets/SharedStyles/ContainerStyles";
import Entries from "./Entries";
import Balance from "./Balance";

export default function DataContainer ({ entries }) {

  const hasEntries = entries?.length > 0;

  return (
    <DataHolder hasEntries={hasEntries}>
      {hasEntries ? (
        <EntriesHolder>
          <ScrollableContainer>
            {entries.map((entry, index) =>
              <Entries
                date={entry.date}
                description={entry.description}
                value={entry.value}
                type={entry.type}
                key={index}
              />
            )}
          </ScrollableContainer>
          <Balance
            balance={entries[0]?.balance}
           />
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