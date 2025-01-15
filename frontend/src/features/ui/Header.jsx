import styled from "styled-components";

const Header = styled.h1`
  font-size: 2.4rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px var(--secondary-color);
  text-align: center;

  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;

export default Header;
