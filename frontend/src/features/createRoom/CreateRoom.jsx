import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import Lock1 from '../../assets/lock1.svg';
import { StyledButton } from '../ui/Button';
import CardContainer from '../ui/CardContainer';
import Header from '../ui/Header';
import {
  FormError,
  InputContainer,
  StyledInput,
  StyledLabel,
  StyledSelect,
} from '../ui/Input';
import StyledForm from '../ui/StyledForm';
import useCreateRoom from './useCreateRoom';

// DISPLAYS CREATE ROOM FORM MODAL BY CREATING PORTAL TO DOCUMENT BODY
// USES useCreateRoom custom hook
// REQUIRES onClose function to close modal

const StyledSvg = styled.img`
  position: absolute;
  top: -40px;
  right: -20px;
  height: 100px;
  /* transform: rotate(15deg); */
  background-color: var(--background-color);
  border: none;

  @media (min-width: 768px) {
    height: 200px;
    top: -100px;
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
  animation: 0.2s show ease-in-out forwards;

  ${(props) =>
    props.$closing &&
    css`
      animation: 0.2s hide ease-in-out forwards;

      @keyframes hide {
        to {
          rotate: 60deg;
          opacity: 0;
        }
      }
    `}

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
  // FOR CLOSING ANIMATION IN SYNERGY WITH $closing MODAL PROP
  const [isClosing, setClosing] = useState(false);

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
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  // DELAYS TO GIVE TIME TO CLOSING ANIMATIONS
  function closeModal(e) {
    setClosing(true);
    e.preventDefault();
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return createPortal(
    <StyledModal $closing={isClosing ? true : false}>
      <CardContainer>
        <StyledSvg alt="icon of a lock inside shield" src={Lock1}></StyledSvg>
        <Header>CREATE</Header>
        <p>Privacy.</p>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <StyledLabel htmlFor="room">Room name</StyledLabel>
            <StyledInput
              id="room"
              type="text"
              placeholder="room"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 8, message: 'Minimum length is 8' },
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Minimum length is 8',
                },
              })}
            ></StyledInput>
            {errors?.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </InputContainer>
          <InputContainer>
            <StyledLabel htmlFor="expiration">Self destruct</StyledLabel>
            <StyledSelect id="expiration" {...register('expiration')}>
              <option value={60 * 60}>1 Hour</option>
              <option value={3 * 60 * 60}>3 Hours</option>
              <option value={12 * 60 * 60}>12 Hours</option>
              <option value={24 * 60 * 60}>24 Hours</option>
            </StyledSelect>
          </InputContainer>

          <StyledButton type="submit" $primary disabled={isCreatingRoom}>
            CREATE ROOM
          </StyledButton>
          <StyledButton onClick={closeModal}>Cancel</StyledButton>
        </StyledForm>
      </CardContainer>
    </StyledModal>,
    document.body,
  );
}

export default CreateRoom;
