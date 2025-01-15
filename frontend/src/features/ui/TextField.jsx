import styled from "styled-components";

const StyledTextArea = styled.textarea`
  background-color: var(--bg-lifted) !important;
  border-radius: 4px;
  padding: 4px;
  resize: none;
  color: white;

  &:focus {
    outline: none;
    border: 1px solid var(--primary-color);
  }
`;

export const SendMessageButton = styled.button`
  top: 0;
  right: 10px;
  height: 100%;
  background-color: transparent;
  z-index: 20;
  position: absolute;
  cursor: pointer;
  border: none;
  color: var(--primary-color);
  overflow: hidden;
  outline: none;
  &:hover {
    transform: scale(1.1);
    opacity: 80%;
  }
`;

export const MessageForm = styled.form`
  position: relative;
`;

function TextField({ value, onChange }) {
  return (
    <StyledTextArea
      style={{
        fontSize: "1.6rem",
        width: "100%",
        backgroundColor: "transparent",
      }}
      placeholder="..."
      rows={3}
      value={value}
      type="text"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextField;
