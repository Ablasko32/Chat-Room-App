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
import toast from "react-hot-toast";
import useGetAllMessages from "../features/messages/useGetAllMessages";
import { Buffer } from "buffer";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../features/ui/Spinner";
import DefaultError from "../features/ui/DefaultError";
import RoomData from "../features/createRoom/RoomData";
import { CiLogout } from "react-icons/ci";

// INDIVIDUAL ROOM , ESTABLISHES SOCKET.io CONNECTION, AUTH VIA JWT IN LOCAL STORAGE
// PROTECTED BY ProtectedRoute via useEffect api call

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  font-size: 3rem;
  color: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
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

  // GET ALL MESSAGES FOR ROOM
  const { data, isPending, error } = useGetAllMessages(room);
  // console.log(data, isPending, error);

  const parsedData = data?.map((el) => {
    // CONVERTING [object,object] to buffer

    el.body = Buffer.from(el.body);
    el.iv = Buffer.from(el.iv);
    const message = {
      ...el,
    };
    return message;
  });

  // console.log("PARSED DATA", parsedData);

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    async function handleSockets() {
      socketRef.current = io("https://192.168.0.17:3000", {
        query: { token },
      });
      socketRef.current.on("connect", () => {
        // console.log(
        //   "Connected to the server. Socket ID:",
        //   socketRef.current.id
        // );
      });

      socketRef.current.emit("joinedRoom", { name: name, room });

      socketRef.current.on("userJoined", (message) => {
        // console.log(message);
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
        // console.log("INDIVIDUAL MSG", msg);
        queryClient.setQueryData(["messages", room], (oldData) => {
          return [...oldData, msg];
        });
        decrypt(msg.body, room, msg.iv).then((data) => {
          let body = data;
          // console.log(body);
          const message = { sender: msg.sender, body: body, date: msg.date };

          // console.log("CREATED MESSAGE", message);
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
      toast.success("Disconnected");
    };
  }, [name, room, queryClient]);

  useEffect(() => {
    // SCROLL EFFECT FOR MESSAGES
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [inbox, data]);

  useEffect(() => {
    // SCROLL EFFECT FOR NOTIFICATIONS
    if (notificationScrollRef.current) {
      notificationScrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
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

  if (isPending) return <Spinner />;
  if (error) return <DefaultError>{error.message}</DefaultError>;

  return (
    <>
      <Container type="rooms">
        <BackButton onClick={() => navigate(-1, { replace: true })}>
          <CiLogout />
        </BackButton>
        <RoomData name={name} room={room} />

        <NotificationBox>
          {userMessages.map((user, idx) => {
            return <p key={idx}>{user}</p>;
          })}
          <div ref={notificationScrollRef}></div>
        </NotificationBox>

        <MessageBox>
          {parsedData
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((msg, idx) => {
              return <Message name={name} key={idx} msg={msg} />;
            })}
          {/* {inbox.map((msg, idx) => {
            return <Message name={name} key={idx} msg={msg} />;
          })} */}
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
