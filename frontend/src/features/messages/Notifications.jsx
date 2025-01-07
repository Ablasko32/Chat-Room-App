import styled from "styled-components";

const NotificationBox = styled.div`
  max-height: 15rem;
  width: 30rem;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-bottom-left-radius: 5px;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.6rem;
  padding: 5px;
  scrollbar-width: thin;

  @media (max-width: 1024px) {
    /* Example: change background color on small screens */
    height: 4rem;
    width: 20rem;
  }
`;

export { NotificationBox };
