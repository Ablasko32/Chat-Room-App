import { CiUser } from "react-icons/ci";
import { PiHouseThin } from "react-icons/pi";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledData = styled.p`
  max-width: 12rem;
  word-break: break-all;
`;

const StyledIcon = styled.span`
  font-size: 2.2rem;
  color: var(--secondary-color);
`;

// DISPLAYS USER NAME AND ROOM NAME
function RoomData({ name, room }) {
  return (
    <Container>
      <StyledRow>
        <StyledIcon>
          <CiUser />{" "}
        </StyledIcon>

        <StyledData>{name}</StyledData>
      </StyledRow>
      <StyledRow>
        <StyledIcon>
          <PiHouseThin />
        </StyledIcon>

        <StyledData>{room}</StyledData>
      </StyledRow>
    </Container>
  );
}

export default RoomData;
