import styled from "styled-components";
import { StyledButton } from "../features/ui/Button";
import { useNavigate } from "react-router-dom";

// DISPLAYS DEFAULT NOT FOUND PAGE WITH BUTTON TO NAVIGATE BACK TO '/'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 40rem;
  font-size: 1.8rem;
  gap: 2rem;
`;

const StyledNumber = styled.p`
  position: fixed;
  top: 30%;
  right: 50%;
  transform: translateX(50%) translateY(-50%);
  z-index: -1;
  font-size: 24rem;
  color: var(--primary-color);
  font-weight: 700;
  opacity: 10%;
  font-family: "Roboto";

  @media (min-width: 768px) {
    font-size: 32rem;
    transform: translateX(50%) translateY(-20%);
  }
`;

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledNumber>404</StyledNumber>
      <h2>Whoops!</h2>
      <p>The page you are looking for could not be found!</p>
      <StyledButton onClick={() => navigate("/")} $primary>
        Start chatting?
      </StyledButton>
    </Container>
  );
}

export default NotFound;
