import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CreateRoom from "../createRoom/CreateRoom";
import useLogin from "./useLogin";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 12px;
  padding: 20px;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff35;
  backdrop-filter: blur(20px);
  padding: 20px;
  height: 60%;
  width: 50%;
  border: 1px solid white;
  border-radius: 10px;

  @media (max-width: 1024px) {
    /* Example: change background color on small screens */
    width: 80%;
  }

  & h1 {
    text-align: center;
  }
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
`;

const StyledInput = styled.input`
  padding: 4px 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  border: 1px solid white;
  border-radius: 5px;

  &:focus {
    border: 1px solid red;
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 5px 10px;
  align-self: center;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  border: 1px solid white;
  color: white;
  cursor: pointer;
`;

function Homepage() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  const { loginRoom, isLogingIn } = useLogin();

  function handleNavigation(e) {
    e.preventDefault();

    loginRoom({ roomName: room, password: password, name: name });
  }

  function createRoom(e) {
    e.preventDefault();
    console.log("creat rooms");
    setIsCreateRoomOpen((prev) => !prev);
  }

  return (
    <Container>
      <h1>Give us your name and connect to a room!</h1>
      <StyledForm>
        <StyledLabel htmlFor="name">Nickname</StyledLabel>
        <StyledInput
          id="name"
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <StyledLabel htmlFor="room">Room name</StyledLabel>
        <StyledInput
          id="room"
          value={room}
          type="text"
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        ></StyledInput>
        <StyledLabel htmlFor="password">Pass phrase 5 words!</StyledLabel>
        <StyledInput
          id="password"
          value={password}
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></StyledInput>
        <StyledButton
          disabled={isLogingIn}
          type="submit"
          onClick={handleNavigation}
        >
          GO TO ROOM
        </StyledButton>
        <StyledButton onClick={createRoom}>CREATE ROOM</StyledButton>
      </StyledForm>
      {isCreateRoomOpen && <CreateRoom onClose={setIsCreateRoomOpen} />}
    </Container>
  );
}

export default Homepage;
