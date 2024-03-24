import { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import Field from "../../ui/Field";
import Button from "../../ui/Button";
import ConfirmationModal from "../../ui/ConfirmationModal";
import RemoveIcon from "../../ui/RemoveIcon";
import EditUserButton from "./EditUserButton";

import { User, UserRequest } from "../../lib/types";

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 25fr 15fr 25fr 10fr 10fr 5fr 5fr;
  border-bottom: 3px solid var(--color-indigo-300);

  &:last-child {
    border-bottom: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type Props = {
  nr: number;
  user: User;
  onUserDelete: (id: string) => void;
  onUserUpdate: (id: string, user: UserRequest) => void;
};

export default function TableRow({
  nr,
  user,
  onUserDelete,
  onUserUpdate,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { id, username, email, role, createdAt } = user;

  return (
    <StyledTableRow>
      <Field>{nr}</Field>
      <Field>{id}</Field>
      <Field>{username}</Field>
      <Field>{email}</Field>
      <Field>{role}</Field>
      <Field>{new Date(createdAt).toLocaleDateString()}</Field>

      <Field>
        <Wrapper>
          <Button onClick={() => setIsOpen(true)} variant="operation">
            <RemoveIcon />
          </Button>
          {isOpen &&
            createPortal(
              <ConfirmationModal
                onClick={() => onUserDelete(id)}
                setIsOpen={setIsOpen}
              />,
              document.body
            )}
        </Wrapper>
      </Field>
      <Field>
        <Wrapper>
          <EditUserButton user={user} onUserUpdate={onUserUpdate} />
        </Wrapper>
      </Field>
    </StyledTableRow>
  );
}
