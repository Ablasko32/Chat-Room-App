import { useState } from 'react';
import { PiUserLight } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { decrypt } from '../../utils/encryption';

const StyledMessage = styled.div`
  border-radius: 14px;
  position: relative;
  width: 80%;
  padding: 8px;
  padding-bottom: 1.4rem;
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  animation: 0.3s show ease-in-out forwards;

  /* subtle message popup */
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  background-color: var(--user-msg-color);
  ${(props) =>
    props.$user &&
    css`
      align-self: flex-end;
      border-bottom-right-radius: 0px !important;

      &::after {
        rotate: -8deg;
        content: '';
        height: 10px;
        width: 8px;
        background-color: inherit;
        border-bottom-left-radius: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(40%);
      }

      & h2 {
        border-bottom: 0.5px solid white;
      }
    `}
  ${(props) =>
    !props.$user &&
    css`
      border-bottom-left-radius: 0px !important;
      background-color: var(--frend-msg-color);

      &::after {
        rotate: 8deg;
        content: '';
        height: 10px;
        width: 8px;
        background-color: inherit;
        border-bottom-right-radius: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        transform: translateY(40%);
      }

      & h2 {
        border-bottom: 0.5px solid white;
      }
    `}
    & h2 {
    margin-bottom: 8px;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const Date = styled.p`
  position: absolute;
  align-self: flex-end;
  margin-top: auto;
  padding: 2px;
  font-style: italic;
  color: #fffcfca4;
  /* #fffcfccb; */

  ${(props) =>
    props.$online === true &&
    css`
      &::before {
        display: inline-block;
        content: '';
        height: 6px;
        width: 6px;
        background-color: var(--light-green);
        filter: blur(0.5px);
        border-radius: 50%;
        margin: 0rem 0.5rem;
      }
    `}
`;

const MessageText = styled.p`
  width: 100%;
  word-wrap: break-word; /* Ensures long words or text wrap to the next line */
  word-break: break-word; /* Break long words that exceed container width */
  overflow-wrap: anywhere; /* Makes text wrap anywhere as needed */
  font-size: 1.5rem;
`;

const StyledName = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Message({ msg, name, onlineUsers }) {
  const [body, setBody] = useState('...');

  const userNames = Object.keys(onlineUsers);

  // console.log("ONLINE USERS IN MESSAGE", userNames);

  const { room } = useParams();

  // DECRYPTION OF MSG BODY
  decrypt(msg.body, room, msg.iv).then((data) => {
    // console.log("DECRYPTED", data);
    setBody(data);
  });

  return (
    <StyledMessage $user={msg.sender === name ? true : false}>
      <StyledName>
        <PiUserLight />
        <span>{msg.sender}</span>
      </StyledName>
      <MessageText>{body}</MessageText>
      <Date
        $online={
          userNames.includes(msg.sender) && msg.sender !== name ? true : false
        }
      >
        {msg.date}
      </Date>
    </StyledMessage>
  );
}

export default Message;
