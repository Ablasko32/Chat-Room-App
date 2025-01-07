import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useState } from "react";
import { Container } from "../features/ui/Container";
import { NotificationBox } from "../features/messages/Notifications";
import { MessageBox } from "../features/messages/MessageBox";
import Message from "../features/messages/Message";
import styled from "styled-components";
import TextField, {
  MessageForm,
  SendMessageButton,
} from "../features/ui/TextField";
import { LiaTelegram } from "react-icons/lia";

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;

function Room() {
  const location = useLocation();
  const messageScrollRef = useRef();
  const notificationScrollRef = useRef();
  const sendRef = useRef();

  // console.log(location);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inbox, setInbox] = useState([]);

  const socketRef = useRef();

  const { room, name } = location.state;

  useEffect(() => {
    socketRef.current = io("http://192.168.0.17:3000");
    socketRef.current.on("connect", () => {
      console.log("Connected to the server. Socket ID:", socketRef.current.id);
    });

    socketRef.current.emit("joinedRoom", { name: name, room });

    socketRef.current.on("userJoined", (message) => {
      console.log(message);
      setUserMessages((prev) => {
        return [...prev, message];
      });
    });

    socketRef.current.on("userLeft", (message) => {
      setUserMessages((prev) => {
        return [...prev, message];
      });
    });

    socketRef.current.on("getNewMessage", (msg) => {
      // console.log(msg);
      setInbox((prev) => {
        return [...prev, msg];
      });
    });

    return () => {
      socketRef.current.disconnect();
      console.log("Disconnected from server");
    };
  }, [name, room]);

  useEffect(() => {
    // SCROLL EFFECT FOR MESSAGES
    messageScrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [inbox]);

  useEffect(() => {
    // SCROLL EFFECT FOR NOTIFICATIONS
    notificationScrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [userMessages]);

  // ON CLICK HANDLER FOR ENTER CLICK
  useEffect(() => {
    const handleEnter = (e) => {
      // console.log(e);
      if (e.key === "Enter") {
        sendRef.current.click();
      }
    };

    document.addEventListener("keydown", handleEnter);

    return () => document.removeEventListener("keydown", handleEnter);
  }, []);

  // FUNCTION TO EMIT NEW MESSAGE
  function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim) return;
    const message = {
      name,
      room,
      text: newMessage,
    };
    socketRef.current.emit("newMessage", message);
    setNewMessage("");
  }

  const navigate = useNavigate();

  return (
    <>
      <Container type="rooms">
        <BackButton onClick={() => navigate(-1, { replace: true })}>
          &larr;
        </BackButton>
        <h1>Welcome to ROOM: #{name}</h1>
        <NotificationBox>
          {userMessages.map((user, idx) => {
            return <p key={idx}>{user}</p>;
          })}
          <div ref={notificationScrollRef}></div>
        </NotificationBox>

        <MessageBox>
          {inbox.map((msg, idx) => {
            return <Message name={name} key={idx} msg={msg} />;
          })}
          <div ref={messageScrollRef}></div>
        </MessageBox>
        <div>
          <MessageForm onSubmit={sendMessage}>
            <TextField value={newMessage} onChange={setNewMessage}></TextField>
            <SendMessageButton ref={sendRef} type="submit">
              <LiaTelegram size={30} />
            </SendMessageButton>
          </MessageForm>
        </div>
      </Container>
    </>
  );
}

export default Room;
