import { createPortal } from "react-dom";
import styled from "styled-components";
import useCreateRoom from "./useCreateRoom";
import { useForm } from "react-hook-form";
import { StyledLabel, StyledInput, StyledSelect, FormError } from "../ui/Input";
import { StyledButton } from "../ui/Button";

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
  background-color: #2e2d2c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

function CreateRoom({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createNewRoom, isCreatingRoom } = useCreateRoom();

  function onSubmit(data) {
    // console.log("DATA", data, "ERRORS", errors);
    if (!data.name || !data.password) return;
    createNewRoom(data);
    onClose();
  }

  return createPortal(
    <StyledModal>
      <Container>
        <h1>Create your Room...</h1>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <StyledLabel htmlFor="room">Room name</StyledLabel>
            <StyledInput
              id="room"
              type="text"
              placeholder="room"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 8, message: "Minimum length is 8" },
              })}
            ></StyledInput>
            {errors?.name && <FormError>{errors.name.message}</FormError>}
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="password">Strong password!</StyledLabel>
            <StyledInput
              id="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum length is 8",
                },
              })}
            ></StyledInput>
            {errors?.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="expiration">Self destruct</StyledLabel>
            <StyledSelect id="expiration" {...register("expiration")}>
              <option value={60 * 60}>1 Hour</option>
              <option value={3 * 60 * 60}>3 Hours</option>
              <option value={12 * 60 * 60}>12 Hours</option>
              <option value={24 * 60 * 60}>24 Hours</option>
            </StyledSelect>
          </InputContainer>

          <StyledButton type="submit" $primary disabled={isCreatingRoom}>
            CREATE ROOM
          </StyledButton>
          <StyledButton onClick={() => onClose()}>Cancel</StyledButton>
        </StyledForm>
      </Container>
    </StyledModal>,
    document.body
  );
}

export default CreateRoom;
