import styled from "styled-components";

const DataHolder = styled.main`
  width: 100%;
  height: calc(100vh - 221px);
  border-radius: 5px;
  background: #ffffff;
  padding: 23px 11px 10px 12px;
`;

const NoEntries = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    width: 180px;
    text-align: center;
    color: #868686;
    font-size: 20px;
    line-height: 23px;
  }
`;

const EntriesHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ScrollableContainer = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;


export { DataHolder, NoEntries, EntriesHolder, ScrollableContainer };