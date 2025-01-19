import styled from "styled-components";
import { RiAlarmWarningLine } from "react-icons/ri";
import useDeleteAllMessages from "./useDeleteAllMessages";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";

const StyledKillSwitch = styled.button`
  border: 0.7px solid var(--red-error);
  background-color: transparent;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  /* position: absolute;
  top: 55px;
  right: 40px; */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  transition: all 0.1s;
  color: var(--red-error);
  align-self: flex-end;
  &:hover {
    box-shadow: 0px 0px 4px 0px var(--red-error);

    & > span {
      filter: drop-shadow(0 0 2px var(--red-error));
    }
  }
`;

const StyledIcon = styled.span`
  font-size: 1.8rem;
  color: var(--red-error);

  &:hover {
    filter: drop-shadow(0 0 5px rgba(0, 123, 255, 0.7));
  }
`;

function KillSwitch() {
  const { room } = useParams();

  const { isDeletingMessages, deleteAllMessages } = useDeleteAllMessages();

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  function handleKillSwitch() {
    // if (!window.confirm("Are you sure?")) return;
    deleteAllMessages(room);
  }

  function openModal() {
    setConfirmOpen(true);
  }

  function closeModal() {
    setConfirmOpen(false);
  }

  return (
    <>
      {" "}
      <StyledKillSwitch onClick={openModal} disabled={isDeletingMessages}>
        <StyledIcon>
          <RiAlarmWarningLine />
        </StyledIcon>

        <p>KillSwitch</p>
      </StyledKillSwitch>
      {isConfirmOpen && (
        <ConfirmModal onConfirm={handleKillSwitch} closeModal={closeModal} />
      )}
    </>
  );
}

export default KillSwitch;
