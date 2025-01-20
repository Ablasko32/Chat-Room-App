import { RiAlertLine } from 'react-icons/ri';
import styled from 'styled-components';
import { StyledButton } from '../ui/Button';

const StyledConfirm = styled.div`
  background-color: red;
  position: fixed;
  z-index: 9;
  top: 20%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 4rem;
  background-color: var(--background-color);
  border: 1px solid var(--soft-border);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  border-radius: 5px;
`;

const StyledMessage = styled.div`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Roboto';
  & span {
    color: var(--red-error);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function ConfirmModal({ closeModal, onConfirm }) {
  function handleCancel() {
    closeModal();
  }
  function handleConfirm(e) {
    onConfirm();
    closeModal();
  }

  return (
    <StyledConfirm className="confirm-modal">
      <StyledMessage>
        {' '}
        <RiAlertLine size={20} color="var(--red-error)" />
        <span>Clear all messages?</span>
      </StyledMessage>
      <ButtonBox>
        <StyledButton
          // style={{ border: "1px solid var(--red-error)" }}
          onClick={handleConfirm}
        >
          Confirm
        </StyledButton>
        <StyledButton onClick={handleCancel}>Cancel</StyledButton>
      </ButtonBox>
    </StyledConfirm>
  );
}

export default ConfirmModal;
