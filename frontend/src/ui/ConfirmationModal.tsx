import styled from "styled-components";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";

const StyledConfirmationModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  border: 3px solid var(--color-indigo-50);
  background-color: var(--color-indigo-900);
  padding: 2.4rem;
  border-radius: 1.7rem;
`;

const Question = styled.p`
  margin-bottom: 3.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  width: 50%;
  margin: 0 auto;
`;

type Props = {
  onClick: () => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmationModal({ onClick, setIsOpen }: Props) {
  return (
    <StyledConfirmationModal>
      <Modal>
        <Question>Are you sure about this operation?</Question>
        <Wrapper>
          <Button
            variant="regular"
            onClick={() => {
              onClick();
              setIsOpen(false);
            }}
          >
            Confirm
          </Button>
          <Button variant="regular" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Wrapper>
      </Modal>
    </StyledConfirmationModal>
  );
}
