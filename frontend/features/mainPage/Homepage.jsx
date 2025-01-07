import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: red;
  gap: 8px;
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
  height: 50%;
  width: 50%;
  border: 1px solid white;
  border-radius: 10px;

  @media (max-width: 1024px) {
    /* Example: change background color on small screens */
    width: 80%;
  }
`;

const StyledInput = styled.input`
  padding: 4px 10px;
  font-size: 2rem;

  &:focus {
    border: 1px solid blue;
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 30%;
`;

function Homepage() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <p>ROOM: {room}</p>
        <p>NAME: {name}</p>
      </div>
      <StyledForm>
        <StyledInput
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          value={room}
          type="text"
          placeholder="room"
          onChange={(e) => setRoom(e.target.value)}
        ></StyledInput>
        <StyledButton
          onClick={(e) => {
            e.preventDefault();
            navigate(`/room/${room}`, { state: { name, room } });
          }}
        >
          GO TO PAGE
        </StyledButton>
      </StyledForm>
    </Container>
  );
}

export default Homepage;
