import styled from "styled-components";
import { createPortal } from "react-dom";

const StyledDropdown = styled.div`
  background-color: var(--bg-lifted);
  border: 1px solid var(--soft-border);
  border-radius: 5px;
  padding: 1rem;
  position: absolute;
  z-index: 1000;
  /* top: 60px;
right: 20px; */
  transform: translateX(-100%) translateY(65%);
  left: ${(props) => props.$position.clientX}px;
  top: ${(props) => props.$position.clientY}px;
  min-width: 8rem;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  gap: 0.2rem;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledOnline = styled.p`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: var(--light-green);
  box-shadow: 0px 0px 1px 0px var(--light-green);
  filter: blur(0.1px);
`;

function OnlineUsersDropdown({ onlineUsers, position }) {
  const userNames = Object.keys(onlineUsers);

  return createPortal(
    <StyledDropdown $position={position}>
      <StyledList>
        {userNames.map((name, idx) => {
          return (
            <StyledListItem key={idx}>
              <StyledOnline />
              {name}
            </StyledListItem>
          );
        })}
        {/* <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaa</li>
        <li>aaazzzaaaaaaaaaaa</li> */}
      </StyledList>
    </StyledDropdown>,
    document.body
  );
}

export default OnlineUsersDropdown;
