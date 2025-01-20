import styled from 'styled-components';

const NotificationBox = styled.div`
  max-height: 6rem;
  width: 60%;
  height: 6%;
  border-bottom: 1px solid var(--soft-border);
  border-left: 1px solid var(--soft-border);
  border-bottom-left-radius: 5px;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.6rem;
  padding: 5px;
  scrollbar-width: thin;
`;

export { NotificationBox };
