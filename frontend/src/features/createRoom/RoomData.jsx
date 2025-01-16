import { CiUser } from "react-icons/ci";
import { PiHouseThin } from "react-icons/pi";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StyledRow = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// DISPLAYS USER NAME AND ROOM NAME
function RoomData({ name, room }) {
  return (
    <Container>
      <StyledRow>
        <CiUser color="var(--secondary-color)" size={20} /> <span>{name}</span>
      </StyledRow>
      <StyledRow>
        <PiHouseThin color="var(--secondary-color)" size={20} />
        <span>{room}</span>
      </StyledRow>
    </Container>
  );
}

export default RoomData;
