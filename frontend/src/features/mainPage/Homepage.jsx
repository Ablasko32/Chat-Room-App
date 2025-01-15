import { useState } from "react";
import styled from "styled-components";
import CreateRoom from "../createRoom/CreateRoom";
import useLogin from "./useLogin";
import Lock from "../../assets/lock.svg";
import { StyledLabel, StyledInput, FormError } from "../ui/Input";
import { StyledButton } from "../ui/Button";
import { useForm } from "react-hook-form";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

function Homepage() {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginRoom, isLogingIn } = useLogin();

  function handleConnect(data) {
    console.log(data);
    loginRoom({ ...data, roomName: data.room });
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
        <InputContainer>
          <StyledLabel htmlFor="name">Nickname</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            placeholder="name"
            {...register("name", {
              required: "Nickname is required",
              minLength: { value: 5, message: "Min lenght is 5" },
            })}
          />
          {errors?.name && <FormError>{errors.name.message}</FormError>}
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="room">Room name</StyledLabel>
          <StyledInput
            id="room"
            type="text"
            placeholder="room"
            {...register("room", {
              required: "Room name is required",
            })}
          ></StyledInput>
          {errors?.room && <FormError>{errors.room.message}</FormError>}
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            placeholder="password"
            {...register("password", { required: "Password is required" })}
          ></StyledInput>
          {errors?.password && <FormError>{errors.password.message}</FormError>}
        </InputContainer>
        <StyledButton
          $primary
          disabled={isLogingIn}
          type="submit"
          onClick={handleSubmit(handleConnect)}
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
