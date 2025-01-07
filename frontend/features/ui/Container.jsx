import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff35;
  backdrop-filter: blur(20px);
  padding: 20px;
  height: 50%;
  width: 50%;
  border: 1px solid white;
  border-radius: 10px;
  max-width: 150rem;

  ${(props) =>
    props.type === "rooms" &&
    css`
      height: 95%;
      width: 95% !important;
      display: grid;
      grid-template-rows: 13% 1fr 18%;
      position: relative;
      padding: 10px;
      padding-top: 40px;
      position: relative;
    `};

  @media (max-width: 1024px) {
    /* Example: change background color on small screens */
    width: 80%;
  }
`;

export { Container };
