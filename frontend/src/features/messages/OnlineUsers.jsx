import { PiUsersThreeLight } from "react-icons/pi";
import styled from "styled-components";

const StlyedOnlineUsersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledNumber = styled.p`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledOnline = styled.p`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: var(--light-green);
  box-shadow: 0px 0px 1px 0px var(--light-green);
  filter: blur(0.1px);
`;

const StyledIcon = styled.p`
  font-size: 3rem;
`;

function OnlineUsers() {
  return (
    <StlyedOnlineUsersContainer>
      <StyledNumber>
        <StyledOnline></StyledOnline>
        <p>4</p>
      </StyledNumber>
      <StyledIcon>
        <PiUsersThreeLight />
      </StyledIcon>
    </StlyedOnlineUsersContainer>
  );
}

export default OnlineUsers;
