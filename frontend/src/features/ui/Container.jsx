import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  padding: 20px;
  height: 50%;
  width: 50%;
  border: 1px solid var(--soft-border);
  border-radius: 10px;
  max-width: 100rem;

  ${(props) =>
    props.type === 'rooms' &&
    css`
      height: 60rem;
      width: 95% !important;
      display: grid;
      grid-template-rows: 14% 1fr 18%;
      position: relative;
      padding: 10px;
      padding-top: 40px;
      position: relative;

      @media (min-width: 768px) {
        height: 90rem;
      }

      @media (min-width: 1240px) {
        height: 100rem;
      }
    `};
`;

export { Container };
