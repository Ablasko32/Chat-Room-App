import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1.5rem;
`;

const StyledInput = styled.input`
  padding: 4px 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  border: 1px solid var(--soft-border);
  border-radius: 5px;
  color: white;

  &:focus {
    border: 1px solid var(--primary-color);
    outline: none;
  }

  &::placeholder {
    opacity: 30%;
  }
`;

const StyledSelect = styled.select`
  color: white;
  padding: 4px 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  border: 1px solid var(--soft-border);
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;

  &:focus {
    border: 1px solid var(--primary-color);
    outline: none;
  }
`;

export { StyledLabel, StyledInput, StyledSelect };
