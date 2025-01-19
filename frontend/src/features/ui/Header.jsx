import styled from "styled-components";

const Header = styled.h1`
  font-size: 2.4rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px var(--secondary-color);
  text-align: center;
  font-family: "Roboto";
  letter-spacing: 0.2rem;

  @media (min-width: 768px) {
    font-size: 3.2rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.8rem;
    letter-spacing: 0.3rem;
  }
`;

export default Header;
