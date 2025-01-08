import { createPortal } from "react-dom";
import styled from "styled-components";
import useCreateRoom from "./useCreateRoom";
import { useForm } from "react-hook-form";

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

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 20;
  background-color: #ffffff61;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledSelect = styled.select`
  padding: 4px 10px;
  font-size: 2rem;
  background-color: transparent;
  border: none;
  border: 1px solid white;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: none;

  &:focus {
    border: 1px solid red;
    outline: none;
  }
`;

function CreateRoom({ onClose }) {
  const { register, handleSubmit } = useForm();

  const { createNewRoom, isCreatingRoom } = useCreateRoom();

  function onSubmit(data) {
    console.log("DATA", data);
    if (!data) return;
    createNewRoom(data);
    onClose();
  }

  return createPortal(
    <StyledModal>
      <Container>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel htmlFor="room">Room name</StyledLabel>
          <StyledInput
            id="room"
            type="text"
            placeholder="room"
            {...register("name")}
          ></StyledInput>
          <StyledLabel htmlFor="password">Strong password!</StyledLabel>
          <StyledInput
            id="password"
            type="text"
            placeholder="password"
            {...register("password")}
          ></StyledInput>
          <StyledLabel htmlFor="expiration">Self destruct</StyledLabel>
          <StyledSelect id="expiration" {...register("expiration")}>
            <option value={60 * 60}>1 Hour</option>
            <option value={3 * 60 * 60}>3 Hours</option>
            <option value={12 * 60 * 60}>12 Hours</option>
            <option value={24 * 60 * 60}>24 Hours</option>
          </StyledSelect>

          <StyledButton disabled={isCreatingRoom}>CREATE ROOM</StyledButton>
        </StyledForm>
      </Container>
      <button
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={() => onClose()}
      >
        Close
      </button>
    </StyledModal>,
    document.body
  );
}

export default CreateRoom;
