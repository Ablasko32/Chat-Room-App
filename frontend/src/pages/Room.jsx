import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { decrypt, encrypt } from "../utils/encryption";

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
  const { room, name } = useParams();
  const messageScrollRef = useRef();
  const notificationScrollRef = useRef();
  const sendRef = useRef();
  const navigate = useNavigate();

  // console.log(location);
  const [userMessages, setUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inbox, setInbox] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    if (!token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    async function handleSockets() {
      socketRef.current = io("https://192.168.0.17:3000");
      socketRef.current.on("connect", () => {
        console.log(
          "Connected to the server. Socket ID:",
          socketRef.current.id
        );
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

        decrypt(msg.body, room, msg.iv).then((data) => {
          let body = data;
          console.log(body);
          const message = { sender: msg.sender, body: body, date: msg.date };

          console.log("CREATED MESSAGE", message);
          // const message = decrypt(encrypted, "SECRET", iv);
          setInbox((prev) => {
            return [...prev, message];
          });
        });
      });
    }
    handleSockets();

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
        e.preventDefault();
        sendRef.current.click();
      }
    };

    document.addEventListener("keydown", handleEnter);

    return () => document.removeEventListener("keydown", handleEnter);
  }, []);

  // FUNCTION TO EMIT NEW MESSAGE
  async function sendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const { encrypted, iv } = await encrypt(newMessage, room);
    const message = {
      name,
      room,
      iv,
      text: encrypted,
    };
    socketRef.current.emit("newMessage", message);
    setNewMessage("");
  }

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
