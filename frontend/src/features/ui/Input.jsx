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
  background-color: var(--background-color);
  border: none;
  width: 26.5rem;
  border: 1px solid var(--soft-border);
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;
  cursor: pointer;

  &:focus {
    border: 1px solid var(--primary-color);
    outline: none;
  }
`;

const FormError = styled.p`
  color: var(--red-error);
  font-size: 1.2rem;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export { StyledLabel, StyledInput, StyledSelect, FormError, InputContainer };
