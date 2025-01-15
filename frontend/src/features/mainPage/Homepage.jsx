import { useState } from "react";
import styled from "styled-components";
import CreateRoom from "../createRoom/CreateRoom";
import useLogin from "./useLogin";
import Lock from "../../assets/lock.svg";
import { StyledLabel, StyledInput } from "../ui/Input";
import { StyledButton } from "../ui/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 14px;
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
  background-color: transparent;
  /* backdrop-filter: blur(20px); */
  padding: 20px;
  height: 80%;
  width: 80%;
  border: 1px solid #5f738a;
  border-radius: 10px;
  position: relative;
  max-width: 80rem;

  & h1 {
    text-align: center;
  }
`;

const StyledSvg = styled.img`
  position: absolute;
  top: -60px;
  right: -20px;
  height: 120px;
  transform: rotate(15deg);

  @media (min-width: 768px) {
    height: 200px;
    top: -100px;
  }
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
      <h1>Connect to a Room...</h1>
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
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <StyledInput
          id="password"
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></StyledInput>
        <StyledButton
          $primary
          disabled={isLogingIn}
          type="submit"
          onClick={handleNavigation}
        >
          GO TO ROOM
        </StyledButton>
        <StyledButton onClick={createRoom}>CREATE ROOM</StyledButton>
        <StyledSvg src={Lock}></StyledSvg>
      </StyledForm>
      {isCreateRoomOpen && <CreateRoom onClose={setIsCreateRoomOpen} />}
    </Container>
  );
}

export default Homepage;
