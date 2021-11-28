import styled from 'styled-components';

const EntriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 18.2px 0;
`;

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
  color: ${(props) => (props.type === 'income' ? '#03AC00' : '#C70000')};
`;

export { EntriesContainer, Description, Price };
