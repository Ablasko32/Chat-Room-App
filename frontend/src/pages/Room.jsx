import { useQueryClient } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { CiLogout } from 'react-icons/ci';
import { LiaTelegram } from 'react-icons/lia';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import RoomData from '../features/createRoom/RoomData';
import KillSwitch from '../features/messages/KillSwitch';
import Message from '../features/messages/Message';
import { MessageBox } from '../features/messages/MessageBox';
import OnlineUsers from '../features/messages/OnlineUsers';
import useGetAllMessages from '../features/messages/useGetAllMessages';
import { Container } from '../features/ui/Container';
import DefaultError from '../features/ui/DefaultError';
import Spinner from '../features/ui/Spinner';
import TextField, {
  MessageForm,
  SendMessageButton,
} from '../features/ui/TextField';
import { encrypt } from '../utils/encryption';

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
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledDataContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 4.5rem;
  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;

function Room() {
  const { room, name } = useParams();
  const messageScrollRef = useRef();
  const sendRef = useRef();
  const navigate = useNavigate();

  // online users
  const [onlineUsers, setOnlineUsers] = useState({});

  const [newMessage, setNewMessage] = useState('');

  const socketRef = useRef();

  // GET ALL MESSAGES FOR ROOM
  const { data, isPending, error } = useGetAllMessages(room);

  const parsedData = data?.map((el) => {
    // CONVERTING [object,object] to buffer

    el.body = Buffer.from(el.body);
    el.iv = Buffer.from(el.iv);
    const message = {
      ...el,
    };
    return message;
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    async function handleSockets() {
      socketRef.current = io('https://192.168.0.17:3000', {
        query: { token },
      });
      socketRef.current.on('connect', () => {
        // console.log(
        //   "Connected to the server. Socket ID:",
        //   socketRef.current.id
        // );
      });

      socketRef.current.emit('joinedRoom', { name: name, room });

      // HANDLE USER JOINED / USER HAS LEFT NOTIFICATIONS
      socketRef.current.on('notification', (message) => {
        toast.success(message, {
          duration: 1500,
        });
      });

      // HANDLE ONLINE USERS LIST
      socketRef.current.on('onlineUserList', (onlineUsers) => {
        // set state that is passed to onlineusers component
        setOnlineUsers(onlineUsers);
      });

      // HANDLE KILL SWITCH DELETE WHEN ONE OF USERS DELETES
      socketRef.current.on('killSwitch', (message) => {
        toast.error(message, {
          duration: 5000,
          style: {
            fontSize: '1.8rem',
          },
        });
        queryClient.invalidateQueries(['messages']);
      });

      // RECIVE MESSAGES AND PUSH TO QUERY DATA OPTIMISTICALY
      socketRef.current.on('getNewMessage', (msg) => {
        queryClient.setQueryData(['messages', room], (oldData) => {
          return [...oldData, msg];
        });
      });
    }
    handleSockets();

    return () => {
      socketRef.current.disconnect();
      toast.success('Disconnected');
      queryClient.clear();
      localStorage.removeItem('authToken');
    };
  }, [name, room, queryClient]);

  useEffect(() => {
    // SCROLL EFFECT FOR MESSAGES
    if (messageScrollRef.current) {
      messageScrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [data]);

  // ON CLICK HANDLER FOR ENTER CLICK
  useEffect(() => {
    const handleEnter = (e) => {
      // console.log(e);
      if (e.key === 'Enter') {
        e.preventDefault();
        sendRef.current.click();
      }
    };

    document.addEventListener('keydown', handleEnter);

    return () => document.removeEventListener('keydown', handleEnter);
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
    socketRef.current.emit('newMessage', message);
    setNewMessage('');
  }

  if (isPending) return <Spinner />;
  if (error) return <DefaultError>{error.message}</DefaultError>;

  return (
    <>
      <Container type="rooms">
        <BackButton onClick={() => navigate(-1, { replace: true })}>
          <CiLogout />
        </BackButton>
        <OnlineUsers onlineUsers={onlineUsers} />

        <StyledDataContainer>
          <RoomData name={name} room={room} />
          <KillSwitch />
        </StyledDataContainer>

        <MessageBox>
          {parsedData
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((msg, idx) => {
              return (
                <Message
                  onlineUsers={onlineUsers}
                  name={name}
                  key={idx}
                  msg={msg}
                />
              );
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
