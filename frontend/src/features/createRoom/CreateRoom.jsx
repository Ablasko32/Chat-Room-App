import { createPortal } from "react-dom";
import styled from "styled-components";
import useCreateRoom from "./useCreateRoom";
import { useForm } from "react-hook-form";
import { StyledLabel, StyledInput, StyledSelect, FormError } from "../ui/Input";
import { StyledButton } from "../ui/Button";
import Header from "../ui/Header";
import CardContainer from "../ui/CardContainer";
import { InputContainer } from "../ui/Input";
import StyledForm from "../ui/StyledForm";

// DISPLAYS CREATE ROOM FORM MODAL BY CREATING PORTAL TO DOCUMENT BODY
// USES useCreateRoom custom hook
// REQUIRES onClose function to close modal

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
  animation: 0.2s show ease-in-out forwards;

  @keyframes show {
    from {
      opacity: 0%;
      rotate: -60deg;
    }
    to {
    }
  }
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
      <CardContainer>
        <Header>CREATE</Header>
        <p>Privacy.</p>
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
      </CardContainer>
    </StyledModal>,
    document.body
  );
}

export default CreateRoom;
