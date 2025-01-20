import styled from 'styled-components';
import { GlobalStyle } from '../../GlobalStyles';
import Footer from './Footer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-size: cover;
`;

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px;
  height: 100dvh;
  width: 100%;
`;

function AppLayout({ children }) {
  return (
    <>
      {/* global app style */}
      <GlobalStyle />
      <Layout>
        <Container>{children}</Container>
        <Footer />
      </Layout>
    </>
  );
}

export default AppLayout;
