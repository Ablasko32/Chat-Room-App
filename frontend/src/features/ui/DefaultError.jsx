import styled from 'styled-components';

const StyledError = styled.p`
  border: 1px solid var(--red-error);
  padding: 20px;
  font-size: 1.6rem;
  border-radius: 5px;
`;

function DefaultError({ children }) {
  return <StyledError>{children}</StyledError>;
}

export default DefaultError;
