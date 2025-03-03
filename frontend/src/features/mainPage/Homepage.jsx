import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Lock1 from '../../assets/lock1.svg';
import CreateRoom from '../createRoom/CreateRoom';
import { StyledButton } from '../ui/Button';
import CardContainer from '../ui/CardContainer';
import Header from '../ui/Header';
import {
  FormError,
  InputContainer,
  StyledInput,
  StyledLabel,
} from '../ui/Input';
import StyledForm from '../ui/StyledForm';
import useLogin from './useLogin';

// DISPLAYS HOMEPAGE WHERE YOU CAN CONNECT TO A ROOM OR CREATE ONE
// USES useLogin CUSTOM HOOK TO RECIVE JWT TOKEN AND STORE IT IN LOCAL STORAGE as authToken

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--soft-border);
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }

  & p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--soft-border);
    text-transform: uppercase;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
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
    // console.log(data);
    loginRoom({ ...data, roomName: data.room });
  }

  function createRoom(e) {
    e.preventDefault();
    setIsCreateRoomOpen((prev) => !prev);
  }

  return (
    <CardContainer>
      <Header>CONNECT</Header>
      <p>Privacy.</p>
      <StyledForm>
        <InputContainer>
          <StyledLabel htmlFor="name">Nickname</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            placeholder="name"
            {...register('name', {
              required: 'Nickname is required',
              minLength: { value: 5, message: 'Min lenght is 5' },
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
            {...register('room', {
              required: 'Room name is required',
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
            {...register('password', { required: 'Password is required' })}
          ></StyledInput>
          {errors?.password && <FormError>{errors.password.message}</FormError>}
        </InputContainer>
        <ButtonContainer>
          {' '}
          <StyledButton
            $primary
            disabled={isLogingIn}
            type="submit"
            onClick={handleSubmit(handleConnect)}
          >
            GO TO ROOM
          </StyledButton>
          <Divider>
            <p>or</p>
          </Divider>
          <StyledButton onClick={createRoom}>CREATE ROOM</StyledButton>
        </ButtonContainer>

        <StyledSvg alt="icon of a lock inside shield" src={Lock1}></StyledSvg>
      </StyledForm>
      {isCreateRoomOpen && <CreateRoom onClose={setIsCreateRoomOpen} />}
    </CardContainer>
  );
}

export default Homepage;
