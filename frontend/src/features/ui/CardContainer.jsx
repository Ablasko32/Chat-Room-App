import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  /* backdrop-filter: blur(20px); */
  padding: 20px;
  height: 80%;
  width: 80%;
  border: 1px solid #5f738a;
  border-radius: 10px;
  position: relative;
  max-width: 80rem;
  box-shadow: 0px 0px 4px 1px rgb(95, 115, 138, 0.2);
`;

export default CardContainer;
