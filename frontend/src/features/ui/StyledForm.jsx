import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 14px;
  padding: 20px;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export default StyledForm;
