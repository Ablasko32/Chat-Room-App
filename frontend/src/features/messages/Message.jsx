import styled, { css } from "styled-components";

const StyledMessage = styled.div`
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  border-radius: 4px;
  height: 8rem;
  width: 80%;
  padding: 8px;
  display: flex;
  flex-direction: column;

  background-color: #1c1d1d40;

  ${(props) =>
    props.$user &&
    css`
      align-self: flex-end;
      border-left: 1px solid white;

      & h2 {
        border-bottom: 1px solid lime;
      }
    `}

  ${(props) =>
    !props.$user &&
    css`
      border-right: 1px solid white;

      & h2 {
        border-bottom: 1px solid red;
      }
    `}

  & h2 {
    margin-bottom: 8px;
  }
`;

const Date = styled.p`
  align-self: flex-end;
  margin-top: auto;
  padding: 2px;
  font-style: italic;
  color: #fffcfccb;
`;

const MessageText = styled.p`
  width: 100%;
  word-wrap: break-word; /* Ensures long words or text wrap to the next line */
  word-break: break-word; /* Break long words that exceed container width */
  overflow-wrap: anywhere; /* Makes text wrap anywhere as needed */
  font-size: 1.2rem;
`;

function Message({ msg, name }) {
  return (
    <StyledMessage $user={msg.sender === name ? true : false}>
      <h2>#{msg.sender}</h2>
      <MessageText>{msg.body}</MessageText>
      <Date>{msg.date}</Date>
    </StyledMessage>
  );
}

export default Message;
