import { useState } from "react";
import { createPortal } from "react-dom";

import Button from "../../ui/Button";
import UpdateIcon from "../../ui/UpdateIcon";
import UsersForm from "./UsersForm";

import { User, UserRequest } from "../../lib/types";

type Props = {
  user: User;
  onUserUpdate: (id: string, user: UserRequest) => void;
};

export default function EditUserButton({ user, onUserUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="operation" onClick={() => setIsOpen(true)}>
        <UpdateIcon />
      </Button>
      {isOpen &&
        createPortal(
          <UsersForm
            user={user}
            onUserUpdate={onUserUpdate}
            setIsOpen={setIsOpen}
          />,
          document.body
        )}
    </>
  );
}
