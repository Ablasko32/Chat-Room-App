import styled from 'styled-components';

const MessageBox = styled.div`
  background-color: var(--bg-lifted);
  height: 100%;
  padding: 1rem;

  overflow-y: scroll;
  width: 90dvw;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  scrollbar-width: thin;
`;

export { MessageBox };
