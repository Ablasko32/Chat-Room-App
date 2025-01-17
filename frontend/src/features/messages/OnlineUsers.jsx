import { useRef, useState } from "react";
import { PiUsersThin } from "react-icons/pi";
import styled from "styled-components";
import OnlineUsersDropdown from "./OnlineUsersDropdown";

const StlyedOnlineUsersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const StyledNumber = styled.div`
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledOnline = styled.p`
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: var(--light-green);
  box-shadow: 0px 0px 1px 0px var(--light-green);
  filter: blur(0.1px);
`;

const StyledIcon = styled.p`
  font-size: 3rem;
`;

function OnlineUsers({ onlineUsers }) {
  // console.log("ONLINE USERS IN ONLINE", onlineUsers);
  const [isDropdownOpen, setDropDownOpen] = useState(false);

  // SETTING POSITION FOR DROPDOWN MENU WITH REF AND ON CLICK HANDLER
  const [position, setPosition] = useState({
    clientX: 0,
    clientY: 0,
  });
  const containerRef = useRef(null);

  // Number of online users
  const numberOfActive = Object.keys(onlineUsers).length || 0;

  const handleOpenDropdown = (e) => {
    const containerRect = containerRef.current.getBoundingClientRect();
    setPosition({
      clientX: containerRect.left + containerRect.width,
      clientY: containerRect.top,
    });

    setDropDownOpen((prev) => !prev);
  };

  return (
    <StlyedOnlineUsersContainer ref={containerRef} onClick={handleOpenDropdown}>
      <StyledNumber>
        <StyledOnline></StyledOnline>
        <p>{numberOfActive}</p>
      </StyledNumber>
      <StyledIcon>
        <PiUsersThin />
      </StyledIcon>
      {isDropdownOpen && (
        <OnlineUsersDropdown position={position} onlineUsers={onlineUsers} />
      )}
    </StlyedOnlineUsersContainer>
  );
}

export default OnlineUsers;
