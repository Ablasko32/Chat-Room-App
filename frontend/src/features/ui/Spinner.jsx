import styled from 'styled-components';

const StyledSpinner = styled.div`
  height: 72px;
  width: 72px;
  border: 10px solid #ffffff18;
  border-top: 10px solid var(--primary-color);
  border-radius: 50%;
  animation: 2s spin infinite ease-in-out;

  @keyframes spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
`;

function Spinner() {
  return <StyledSpinner></StyledSpinner>;
}

export default Spinner;
