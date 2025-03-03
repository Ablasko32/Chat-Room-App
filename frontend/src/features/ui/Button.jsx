import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  text-transform: uppercase;
  margin-top: 0.5rem;
  font-size: 1.3rem;
  width: 70%;
  font-weight: 600;
  padding: 8px 16px;
  align-self: center;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  border: 1px solid var(--soft-border);
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 2px 2px rgb(95, 115, 138, 0.2);
  transition: all 0.3s;

  ${(props) =>
    props.$primary &&
    css`
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
    `};

  ${(props) =>
    props.$back &&
    css`
      width: 20%;
      max-width: 15rem;
    `};

  &:focus {
    border: 1px solid var(--primary-color);
    outline: none;
  }

  &:hover {
    transform: scale(1.05);
    border: 1px solid var(--primary-color);
  }
`;

export { StyledButton };
