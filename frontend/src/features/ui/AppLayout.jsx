import styled from "styled-components";
import { GlobalStyle } from "../../GlobalStyles";

const Container = styled.div`
  background-image: linear-gradient(#111010ad, #1110103b),
    url("https://images.unsplash.com/photo-1636955890525-84c5fa482c85?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;
  background-position: center;
  background-size: cover;
`;

function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Container>{children}</Container>
    </>
  );
}

export default AppLayout;
