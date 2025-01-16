import { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { decrypt } from "../../utils/encryption";

const StyledMessage = styled.div`
  border-bottom: 0.5px solid var(--soft-border);
  border-top: 0.5px solid var(--soft-border);
  border-radius: 4px;

  width: 80%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  max-width: 50rem;

  background-color: #1c1d1d40;

  ${(props) =>
    props.$user &&
    css`
      align-self: flex-end;
      border-left: 0.5px solid var(--soft-border);
      border-bottom-right-radius: 0px !important;

      & h2 {
        border-bottom: 0.5px solid var(--light-green);
      }
    `}

  ${(props) =>
    !props.$user &&
    css`
      border-right: 0.5px solid white;
      border-bottom-left-radius: 0px !important;

      & h2 {
        border-bottom: 0.5px solid var(--primary-color);
      }
    `}

  & h2 {
    margin-bottom: 8px;
    font-size: 1.6rem;
    font-weight: 600;
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
  font-size: 1.4rem;
`;

function Message({ msg, name }) {
  const [body, setBody] = useState("...");
  // console.log("MSG IN MSG", msg);

  const { room } = useParams();

  // DECRYPTION OF MSG BODY
  decrypt(msg.body, room, msg.iv).then((data) => {
    // console.log("DECRYPTED", data);
    setBody(data);
  });

  return (
    <StyledMessage $user={msg.sender === name ? true : false}>
      <h2>#{msg.sender}</h2>
      <MessageText>{body}</MessageText>
      <Date>{msg.date}</Date>
    </StyledMessage>
  );
}

export default Message;
